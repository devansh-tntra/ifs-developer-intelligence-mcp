export const IFS_SYNONYM_MAP: Record<string, string[]> = {
  'vat': ['tax', 'tax_calculation_api', 'statutory_fee_api', 'fee_code'],
  'tax': ['vat', 'tax_calculation_api', 'statutory_fee_api', 'fee_code'],
  'order': ['customer_order', 'purchase_order', 'customer_order_tab', 'order_no'],
  'customer': ['customer_info', 'customer_order', 'identity', 'customer_id'],
  'equipment': ['equipment_object', 'equipment_maintenance', 'maint_object'],
  'invoice': ['outgoing_invoice', 'customer_invoice', 'supplier_invoice', 'invoice_id'],
  'inventory': ['inventory_part', 'inventory_part_in_stock', 'warehouse'],
  'permission': ['security_sys', 'permission_set', 'fnd_enduser', 'grant']
};

export function expandQuerySynonyms(query: string): string[] {
  const tokens = query.toLowerCase().split(/\s+/);
  const expanded = new Set<string>(tokens);

  for (const t of tokens) {
    if (IFS_SYNONYM_MAP[t]) {
      for (const syn of IFS_SYNONYM_MAP[t]) {
        expanded.add(syn);
      }
    }
  }

  return Array.from(expanded);
}
