import { useMemo, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InfoNote } from '@/components/form/info-note';
import { PrimaryButton } from '@/components/form/primary-button';
import { StepProgress } from '@/components/form/step-progress';
import { TextField } from '@/components/form/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { addListing, makeListingId } from '@/features/sell/store';
import { emptyVehicle, type VehicleInfo } from '@/features/sell/types';
import { useContentMaxWidth } from '@/hooks/use-desktop-layout';
import { lookupPlate, normalisePlate } from '@/services/plate-lookup';

/**
 * Seller onboarding — build-order slice #1.
 * Flow: plate lookup -> listing details -> location & contact -> review -> done.
 *
 * Product guardrails baked into the copy here:
 *  - The driver is the default, included part of the service. There is no
 *    "drive it yourself vs use a driver" choice anywhere in this flow.
 *  - City/area is collected only as internal triage (limited driver capacity).
 *  - Plate lookup is clearly flagged as not-yet-connected.
 *  - No insurance claims, no invented social proof.
 *
 * Deliberately NO identity check to list. Nothing is at risk when someone posts
 * photos of a car — no money moves and no ownership changes — so a bank-ID wall
 * here only costs us sellers, who are the scarce side. (Nettiauto and Tori don't
 * ask either.) Identity gets confirmed when the deal completes and ownership
 * actually transfers, where it protects someone and where the seller already has
 * a buyer and so won't drop out.
 */

const STEPS = ['Autosi', 'Ilmoitus', 'Nouto', 'Yhteenveto'] as const;

export default function SellScreen() {
  const insets = useSafeAreaInsets();
  const contentMaxWidth = useContentMaxWidth();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Step 1 — vehicle
  const [plate, setPlate] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleInfo>(emptyVehicle);
  const [vehicleFound, setVehicleFound] = useState(false);

  // Step 2 — listing
  const [askingPriceEur, setAskingPriceEur] = useState('');
  const [description, setDescription] = useState('');
  const [knownFaults, setKnownFaults] = useState('');

  // Step 3 — pickup / contact
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');

  const contentPadding = {
    paddingTop: Platform.OS === 'web' ? Spacing.six : insets.top + Spacing.three,
    paddingBottom: insets.bottom + BottomTabInset + Spacing.four,
  };

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
        return vehicleFound && vehicle.make.trim() !== '' && vehicle.model.trim() !== '';
      case 1:
        return askingPriceEur.trim() !== '';
      case 2:
        return sellerName.trim() !== '' && phone.trim() !== '' && area.trim() !== '';
      case 3:
        return true;
      default:
        return false;
    }
  }, [step, vehicleFound, vehicle, askingPriceEur, sellerName, phone, area]);

  function submit() {
    addListing({
      id: makeListingId(),
      createdAt: new Date().toISOString(),
      // Nobody is verified at listing time — that happens when the sale
      // completes and ownership actually transfers.
      identityVerified: false,
      identityMethod: null,
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
        <ThemedView className="w-full gap-4" style={{ maxWidth: contentMaxWidth }}>
          <ThemedText type="title" className="text-center">
            Kiitos{sellerName ? `, ${sellerName.split(' ')[0]}` : ''} 👋
          </ThemedText>
          <ThemedText themeColor="textSecondary" className="text-center">
            Autosi tiedot on vastaanotettu. Joku perustajistamme ottaa sinuun yhteyttä puhelimitse
            tai sähköpostitse sopiakseen henkilöllisyyden tarkistuksesta ja noudosta.
          </ThemedText>
          <InfoNote tone="info" title="Mitä tapahtuu seuraavaksi">
            Tarkistamme tiedot, kuljettajamme noutaa autosi ja toimittaa sen ostajalle, ja opastamme
            sinut paperitöiden läpi. Et tarvitse sovellusta tai tiliä.
          </InfoNote>
          <PrimaryButton
            title="Listaa toinen auto"
            variant="secondary"
            onPress={() => {
              setDone(false);
              setStep(0);
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
      <ThemedView className="w-full gap-4" style={{ maxWidth: contentMaxWidth }}>
        {step === 0 && (
          <View className="gap-2 self-stretch">
            <ThemedText type="title">Myy autosi ajamatta sitä minnekään.</ThemedText>
            <ThemedText themeColor="textSecondary">
              Kuljettaja tulee luoksesi, noutaa auton ja toimittaa sen ostajalle. Saat
              yksityiskaupan hinnan — ilman vaivaa tai matkaa. Ilmoituksen jättäminen ei vaadi
              tiliä eikä pankkitunnuksia.
            </ThemedText>
          </View>
        )}
        <ThemedText type="subtitle">Myy autosi</ThemedText>
        <StepProgress current={step} total={STEPS.length} label={STEPS[step]} />

        {step === 0 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              Syötä rekisterinumero, niin haemme auton tiedot puolestasi.
            </ThemedText>
            <TextField
              label="Rekisterinumero"
              placeholder="ABC-123"
              autoCapitalize="characters"
              autoCorrect={false}
              value={plate}
              onChangeText={setPlate}
            />
            <PrimaryButton
              title={vehicleFound ? 'Hae uudelleen' : 'Hae autoni tiedot'}
              variant={vehicleFound ? 'secondary' : 'primary'}
              loading={lookingUp}
              onPress={runLookup}
            />
            {vehicleFound && (
              <>
                <TextField label="Merkki" value={vehicle.make} onChangeText={(t) => updateVehicle('make', t)} />
                <TextField label="Malli" value={vehicle.model} onChangeText={(t) => updateVehicle('model', t)} />
                <TextField
                  label="Vuosimalli"
                  keyboardType="number-pad"
                  value={vehicle.year}
                  onChangeText={(t) => updateVehicle('year', t)}
                />
                <TextField
                  label="Mittarilukema (km)"
                  keyboardType="number-pad"
                  value={vehicle.mileageKm}
                  onChangeText={(t) => updateVehicle('mileageKm', t)}
                />
                <TextField label="Polttoaine" value={vehicle.fuel} onChangeText={(t) => updateVehicle('fuel', t)} />
                <TextField
                  label="Katsastus voimassa asti"
                  value={vehicle.inspectionValidUntil}
                  onChangeText={(t) => updateVehicle('inspectionValidUntil', t)}
                  hint="Esitäytetty haun perusteella — muokkaa jos jokin vaikuttaa väärältä."
                />
              </>
            )}
            <InfoNote tone="demo" title="Demo — ei vielä kytketty">
              Nämä arvot ovat paikkamerkkejä. Tuotannossa haku lukee Traficomin tiedot
              rekisterinumeron perusteella, jolloin tiedot ovat vahvistettuja eikä käsin
              kirjoitettuja.
            </InfoNote>
          </View>
        )}

        {step === 1 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              Mitä haluat autosta pyytää, ja mitä ostajan tulisi tietää?
            </ThemedText>
            <TextField
              label="Pyyntihinta (€)"
              keyboardType="number-pad"
              placeholder="12500"
              value={askingPriceEur}
              onChangeText={setAskingPriceEur}
              hint="Ei liikkeen katetta — saat enemmän kuin vaihtoautotarjouksesta."
            />
            <TextField
              label="Kuvaus"
              placeholder="Huoltohistoria, vaihtorenkaat, miksi myyt…"
              multiline
              value={description}
              onChangeText={setDescription}
              className="min-h-[88px]"
              style={{ textAlignVertical: 'top' }}
            />
            <TextField
              label="Tiedossa olevat viat"
              placeholder="Ole rehellinen — tämä kirjataan kauppakirjaan."
              multiline
              value={knownFaults}
              onChangeText={setKnownFaults}
              className="min-h-[88px]"
              style={{ textAlignVertical: 'top' }}
            />
          </View>
        )}

        {step === 2 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">
              Mistä kuljettajamme noutaa auton? Sinun ei tarvitse matkustaa minnekään —
              kuljettaja tulee luoksesi ja toimittaa auton ostajalle.
            </ThemedText>
            <TextField label="Nimesi" value={sellerName} onChangeText={setSellerName} placeholder="Matti Meikäläinen" />
            <TextField
              label="Puhelinnumero"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              placeholder="+358 40 123 4567"
            />
            <TextField
              label="Kaupunki tai alue"
              value={area}
              onChangeText={setArea}
              placeholder="Helsinki, Kallio"
              hint="Käytetään kuljettajan aikatauluttamiseen lähelläsi."
            />
            <InfoNote tone="info" title="Kuljettaja sisältyy hintaan">
              Tarkastettu kuljettaja noutaa ja toimittaa auton osana palvelua, ei lisämaksusta.
              Hoidamme turvallisuuden, paperityöt ja kunnon tarkistuksen matkan varrella.
            </InfoNote>
          </View>
        )}

        {step === 3 && (
          <View className="gap-3 self-stretch">
            <ThemedText themeColor="textSecondary">Nopea tarkistus ennen lähettämistä.</ThemedText>
            <ThemedView type="backgroundElement" className="gap-2 rounded-2xl p-4">
              <SummaryRow label="Auto" value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`.trim()} />
              <SummaryRow label="Rekisterinumero" value={normalisePlate(plate)} />
              <SummaryRow label="Mittarilukema" value={vehicle.mileageKm ? `${vehicle.mileageKm} km` : '—'} />
              <SummaryRow label="Pyyntihinta" value={askingPriceEur ? `€${askingPriceEur}` : '—'} />
              <SummaryRow label="Yhteystiedot" value={`${sellerName} · ${phone}`} />
              <SummaryRow label="Noutoalue" value={area} />
            </ThemedView>
            <InfoNote tone="info">
              Lähettämällä hyväksyt, että perustaja voi ottaa sinuun yhteyttä sopiakseen
              henkilöllisyyden tarkistuksesta ja noudosta. Mitään ei veloiteta nyt.
            </InfoNote>
          </View>
        )}

        <View className="flex-row gap-2 self-stretch">
          {step > 0 && (
            <PrimaryButton
              title="Takaisin"
              variant="secondary"
              className="flex-1"
              onPress={() => setStep((s) => s - 1)}
            />
          )}
          {step < STEPS.length - 1 ? (
            <PrimaryButton
              title="Jatka"
              disabled={!canContinue}
              className="flex-1"
              onPress={() => setStep((s) => s + 1)}
            />
          ) : (
            <PrimaryButton
              title="Lähetä ilmoitus"
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
