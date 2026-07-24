import { useMemo, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/form/info-note';
import { PrimaryButton } from '@/components/form/primary-button';
import { StepProgress } from '@/components/form/step-progress';
import { TextField } from '@/components/form/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { addListing, makeListingId } from '@/features/sell/store';
import { emptyVehicle, type IdentityMethod, type VehicleInfo } from '@/features/sell/types';
import { lookupPlate, normalisePlate } from '@/services/plate-lookup';
import { verifyIdentity } from '@/services/verification';

/**
 * Seller onboarding — build-order slice #1.
 * Flow: identity verification -> plate lookup -> listing details -> location
 * & contact -> review -> done.
 *
 * Product guardrails baked into the copy here:
 *  - The driver is the default, included part of the service. There is no
 *    "drive it yourself vs use a driver" choice anywhere in this flow.
 *  - City/area is collected only as internal triage (limited driver capacity).
 *  - Identity check and plate lookup are clearly flagged as not-yet-connected.
 *  - No insurance claims, no invented social proof.
 */

const STEPS = ['Verify', 'Your car', 'Listing', 'Pickup', 'Review'] as const;

export default function SellScreen() {
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Step 1 — identity
  const [identityMethod, setIdentityMethod] = useState<IdentityMethod | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  // Step 2 — vehicle
  const [plate, setPlate] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleInfo>(emptyVehicle);
  const [vehicleFound, setVehicleFound] = useState(false);

  // Step 3 — listing
  const [askingPriceEur, setAskingPriceEur] = useState('');
  const [description, setDescription] = useState('');
  const [knownFaults, setKnownFaults] = useState('');

  // Step 4 — pickup / contact
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');

  const contentPadding = {
    paddingTop: Platform.OS === 'web' ? Spacing.six : insets.top + Spacing.three,
    paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
  };

  async function runVerify(method: IdentityMethod) {
    setIdentityMethod(method);
    setVerifying(true);
    try {
      const result = await verifyIdentity(method);
      setVerified(result.verified);
    } finally {
      setVerifying(false);
    }
  }

  async function runLookup() {
    if (!plate.trim()) return;
    setLookingUp(true);
    try {
      const info = await lookupPlate(plate);
      setVehicle(info);
      setPlate(info.plate);
      setVehicleFound(true);
    } finally {
      setLookingUp(false);
    }
  }

  function updateVehicle<K extends keyof VehicleInfo>(key: K, value: VehicleInfo[K]) {
    setVehicle((v) => ({ ...v, [key]: value }));
  }

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return verified;
      case 1:
        return vehicleFound && vehicle.make.trim() !== '' && vehicle.model.trim() !== '';
      case 2:
        return askingPriceEur.trim() !== '';
      case 3:
        return sellerName.trim() !== '' && phone.trim() !== '' && area.trim() !== '';
      case 4:
        return true;
      default:
        return false;
    }
  }, [step, verified, vehicleFound, vehicle, askingPriceEur, sellerName, phone, area]);

  function submit() {
    addListing({
      id: makeListingId(),
      createdAt: new Date().toISOString(),
      identityVerified: verified,
      identityMethod,
      vehicle: { ...vehicle, plate: normalisePlate(plate) },
      askingPriceEur,
      description,
      knownFaults,
      sellerName,
      phone,
      area,
    });
    setDone(true);
  }

  if (done) {
    return (
      <ScrollView
        className="flex-1 bg-cream dark:bg-surface-dark"
        contentContainerClassName="flex-grow items-center justify-center px-4"
        contentContainerStyle={contentPadding}>
        <ThemedView className="w-full gap-4" style={{ maxWidth: MaxContentWidth }}>
          <ThemedText type="title" className="text-center">
            Thanks{sellerName ? `, ${sellerName.split(' ')[0]}` : ''} 👋
          </ThemedText>
          <ThemedText themeColor="textSecondary" className="text-center">
            Your car is in. One of the two founders will contact you directly by phone or email to
            arrange the identity check and pickup.
          </ThemedText>
          <InfoNote tone="info" title="What happens next">
            We verify the details, our driver picks up your car and delivers it to the buyer, and we
            walk you through the paperwork. No app or account needed on your side.
          </InfoNote>
          <PrimaryButton
            title="List another car"
            variant="secondary"
            onPress={() => {
              setDone(false);
              setStep(0);
              setVerified(false);
              setIdentityMethod(null);
              setPlate('');
              setVehicle(emptyVehicle);
              setVehicleFound(false);
              setAskingPriceEur('');
              setDescription('');
              setKnownFaults('');
              setSellerName('');
              setPhone('');
              setArea('');
            }}
          />
        </ThemedView>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-cream dark:bg-surface-dark"
      contentContainerClassName="flex-row justify-center px-4"
      contentContainerStyle={contentPadding}
      keyboardShouldPersistTaps="handled">
      <ThemedView className="w-full gap-4" style={{ maxWidth: MaxContentWidth }}>
        {step === 0 && (
          <View className="gap-2 self-stretch">
            <ThemedText type="title">Sell your car without driving it anywhere.</ThemedText>
            <ThemedText themeColor="textSecondary">
              A driver comes to you, picks up the car, and delivers it to the buyer. You keep the
              private-sale price — without the hassle or the distance.
            </ThemedText>
          </View>
        )}
        <ThemedText type="subtitle">Sell your car</ThemedText>
        <StepProgress current={step} total={STEPS.length} label={STEPS[step]} />

        {step === 0 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              First, confirm it&apos;s really you. We check identity with Finnish bank ID or
              Mobiilivarmenne — the same trust rails banks use.
            </ThemedText>
            <View className="gap-2">
              <PrimaryButton
                title="Verify with bank ID"
                variant={identityMethod === 'bank-id' && verified ? 'secondary' : 'primary'}
                loading={verifying && identityMethod === 'bank-id'}
                onPress={() => runVerify('bank-id')}
              />
              <PrimaryButton
                title="Use Mobiilivarmenne"
                variant="secondary"
                loading={verifying && identityMethod === 'mobiilivarmenne'}
                onPress={() => runVerify('mobiilivarmenne')}
              />
            </View>
            {verified && (
              <InfoNote tone="info" title="Identity confirmed">
                Verified via {identityMethod === 'bank-id' ? 'bank ID' : 'Mobiilivarmenne'}. You can
                continue.
              </InfoNote>
            )}
            <InfoNote tone="demo" title="Demo — not connected yet">
              This is a placeholder. The real flow redirects to the Finnish Trust Network (bank ID /
              Mobiilivarmenne) through Signicat; no bank credentials are ever handled here.
            </InfoNote>
          </View>
        )}

        {step === 1 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              Enter your license plate and we pull the car&apos;s details for you.
            </ThemedText>
            <TextField
              label="License plate"
              placeholder="ABC-123"
              autoCapitalize="characters"
              autoCorrect={false}
              value={plate}
              onChangeText={setPlate}
            />
            <PrimaryButton
              title={vehicleFound ? 'Look up again' : 'Look up my car'}
              variant={vehicleFound ? 'secondary' : 'primary'}
              loading={lookingUp}
              onPress={runLookup}
            />
            {vehicleFound && (
              <>
                <TextField label="Make" value={vehicle.make} onChangeText={(t) => updateVehicle('make', t)} />
                <TextField label="Model" value={vehicle.model} onChangeText={(t) => updateVehicle('model', t)} />
                <TextField
                  label="Year"
                  keyboardType="number-pad"
                  value={vehicle.year}
                  onChangeText={(t) => updateVehicle('year', t)}
                />
                <TextField
                  label="Mileage (km)"
                  keyboardType="number-pad"
                  value={vehicle.mileageKm}
                  onChangeText={(t) => updateVehicle('mileageKm', t)}
                />
                <TextField label="Fuel" value={vehicle.fuel} onChangeText={(t) => updateVehicle('fuel', t)} />
                <TextField
                  label="Inspection (katsastus) valid until"
                  value={vehicle.inspectionValidUntil}
                  onChangeText={(t) => updateVehicle('inspectionValidUntil', t)}
                  hint="Pre-filled from the lookup — edit if it looks off."
                />
              </>
            )}
            <InfoNote tone="demo" title="Demo — not connected yet">
              These values are placeholders. In production the lookup reads Traficom&apos;s data by
              registration number, so specs are verified rather than typed.
            </InfoNote>
          </View>
        )}

        {step === 2 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              How much do you want for it, and anything a buyer should know?
            </ThemedText>
            <TextField
              label="Asking price (€)"
              keyboardType="number-pad"
              placeholder="12500"
              value={askingPriceEur}
              onChangeText={setAskingPriceEur}
              hint="No dealer margin is taken out — you keep more than a trade-in offer."
            />
            <TextField
              label="Description"
              placeholder="Service history, extra tyres, why you're selling…"
              multiline
              value={description}
              onChangeText={setDescription}
              className="min-h-[88px]"
              style={{ textAlignVertical: 'top' }}
            />
            <TextField
              label="Known faults"
              placeholder="Be honest — this is written into the bill of sale."
              multiline
              value={knownFaults}
              onChangeText={setKnownFaults}
              className="min-h-[88px]"
              style={{ textAlignVertical: 'top' }}
            />
          </View>
        )}

        {step === 3 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              Where should our driver pick up the car? You don&apos;t travel anywhere — the driver
              comes to you and delivers it to the buyer.
            </ThemedText>
            <TextField label="Your name" value={sellerName} onChangeText={setSellerName} placeholder="Matti Meikäläinen" />
            <TextField
              label="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="+358 40 123 4567"
            />
            <TextField
              label="City or area"
              value={area}
              onChangeText={setArea}
              placeholder="Helsinki, Kallio"
              hint="Used to schedule a driver near you."
            />
            <InfoNote tone="info" title="Driver included">
              A vetted driver picking up and delivering the car is part of the service, not an
              add-on. We handle safety, paperwork and a condition check along the way.
            </InfoNote>
          </View>
        )}

        {step === 4 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">Quick check before you send it in.</ThemedText>
            <ThemedView type="backgroundElement" className="gap-2 rounded-2xl p-4">
              <SummaryRow label="Identity" value={verified ? 'Verified' : 'Not verified'} />
              <SummaryRow label="Car" value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`.trim()} />
              <SummaryRow label="Plate" value={normalisePlate(plate)} />
              <SummaryRow label="Mileage" value={vehicle.mileageKm ? `${vehicle.mileageKm} km` : '—'} />
              <SummaryRow label="Asking price" value={askingPriceEur ? `€${askingPriceEur}` : '—'} />
              <SummaryRow label="Contact" value={`${sellerName} · ${phone}`} />
              <SummaryRow label="Pickup area" value={area} />
            </ThemedView>
            <InfoNote tone="info">
              By submitting you agree that a founder may contact you to arrange the identity check
              and pickup. Nothing is charged now.
            </InfoNote>
          </View>
        )}

        <View className="flex-row gap-2 self-stretch">
          {step > 0 && (
            <PrimaryButton
              title="Back"
              variant="secondary"
              className="flex-1"
              onPress={() => setStep((s) => s - 1)}
            />
          )}
          {step < STEPS.length - 1 ? (
            <PrimaryButton
              title="Continue"
              disabled={!canContinue}
              className="flex-1"
              onPress={() => setStep((s) => s + 1)}
            />
          ) : (
            <PrimaryButton
              title="Submit listing"
              disabled={!canContinue}
              className="flex-1"
              onPress={submit}
            />
          )}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-3">
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold" className="flex-shrink text-right">
        {value || '—'}
      </ThemedText>
    </View>
  );
}
