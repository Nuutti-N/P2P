/**
 * Types for the seller onboarding flow.
 *
 * This is build-order slice #1 from the product brief:
 * identity verification -> plate lookup -> listing form.
 * Kept deliberately small; it is the first coded slice while the rest of the
 * loop (buyer matching, driver handover, escrow, Traficom transfer) is still
 * being validated manually.
 */

export type IdentityMethod = 'bank-id' | 'mobiilivarmenne';

export type VehicleInfo = {
  /** Finnish registration plate, normalised to upper-case, e.g. "ABC-123". */
  plate: string;
  make: string;
  model: string;
  /** Kept as string to stay forgiving in the form; parse when needed. */
  year: string;
  mileageKm: string;
  fuel: string;
  /** Katsastus (roadworthiness inspection) valid-until date, ISO yyyy-mm-dd. */
  inspectionValidUntil: string;
};

export type SellerListing = {
  id: string;
  createdAt: string;
  identityVerified: boolean;
  identityMethod: IdentityMethod | null;
  vehicle: VehicleInfo;
  askingPriceEur: string;
  description: string;
  knownFaults: string;
  sellerName: string;
  phone: string;
  /**
   * City / area. Used internally to decide which leads a driver can physically
   * service first (there are only two drivers during the pilot). This is a
   * behind-the-scenes triage input, NOT a "drive it yourself vs use a driver"
   * choice shown to the seller.
   */
  area: string;
};

export const emptyVehicle: VehicleInfo = {
  plate: '',
  make: '',
  model: '',
  year: '',
  mileageKm: '',
  fuel: '',
  inspectionValidUntil: '',
};
