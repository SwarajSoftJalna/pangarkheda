import { PaymentAccordion as PaymentAccordionType } from '@/lib/storage';
import Accordion from './Accordion';

interface PaymentAccordionProps {
  accordions: PaymentAccordionType[];
}

export default function PaymentAccordion({ accordions }: PaymentAccordionProps) {
  if (accordions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {accordions.map((accordion) => (
        <Accordion
          key={accordion.id}
          title={accordion.title}
          variant="payment"
        >
          {accordion.image ? (
            <div className="flex justify-center">
              <img
                src={accordion.image}
                alt={accordion.title}
                className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
                style={{ maxHeight: '400px' }}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-6xl mb-4">🖼️</div>
              <p className="text-gray-600">
                या विभागासाठी कोणतीही प्रतिमा अपलोड केलेली नाही.
              </p>
            </div>
          )}
        </Accordion>
      ))}
    </div>
  );
}
