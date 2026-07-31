import { describe, it, expect } from 'vitest';
import { parseMarbleEntity, parseMarbleProjection } from '../src/parsers/marbleParser.js';

describe('Marble DSL Parser Tests', () => {
  it('should parse entity attributes and keys correctly', () => {
    const entityDsl = `
      entity CustomerOrder {
         from = "CUSTOMER_ORDER_TAB";

         attribute OrderNo Text {
            label = "Order No";
            editable = [ETag = null];
         }
         attribute Description Text {
            label = "Description";
         }

         keys {
            key OrderNo;
         }
      }
    `;

    const parsed = parseMarbleEntity(entityDsl, 'CustomerOrder.entity');
    expect(parsed.name).toBe('CustomerOrder');
    expect(parsed.tableName).toBe('CUSTOMER_ORDER_TAB');
    expect(parsed.attributes.length).toBe(2);
    expect(parsed.attributes[0].name).toBe('OrderNo');
  });

  it('should parse projection entity sets and actions', () => {
    const projectionDsl = `
      projection CustomerOrderHandling;
      component ORDER;

      entityset CustomerOrderSet for CustomerOrder;

      action ApproveOrder {
         initialcheck implementation;
      }
    `;

    const parsed = parseMarbleProjection(projectionDsl, 'CustomerOrderHandling.projection');
    expect(parsed.name).toBe('CustomerOrderHandling');
    expect(parsed.component).toBe('ORDER');
    expect(parsed.entities).toContain('CustomerOrder');
    expect(parsed.actions).toContain('ApproveOrder');
  });
});
