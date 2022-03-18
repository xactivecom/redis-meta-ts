/**
 * CSV column layout for lab test facilities.
 */
export class TestFacilityColumns {
  licenseId: string;
  type: string;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  postal?: string;
  phone?: string;
  fax?: string;
  oid: string;
  fullOid: string;
  upi: string;

  // Used during CSV load to introspect header columns
  setNotEmpty() {
    this.licenseId = '';
    this.type = '';
    this.name = '';
    this.address1 = '';
    this.address2 = '';
    this.city = '';
    this.province = '';
    this.postal = '';
    this.phone = '';
    this.fax = '';
    this.oid = '';
    this.fullOid = '';
    this.upi = '';
  }
};
