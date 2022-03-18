/**
 * CSV column layout for practitioners.
 */
export class PhysLicColumns {
  licenseId: string;
  type: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  postal?: string;

  // Used during CSV load to introspect header columns
  setNotEmpty() {
    this.licenseId = '';
    this.type = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.address1 = '';
    this.address2 = '';
    this.city = '';
    this.province = '';
    this.postal = '';
  }
};
