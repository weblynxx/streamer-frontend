export interface Customer {
  id: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  customerNumber: string;
}

export const CustomerEmpty: Customer = {
  id: "",
  name: "",
  street: "",
  zip: "",
  city: "",
  customerNumber: "",
};
