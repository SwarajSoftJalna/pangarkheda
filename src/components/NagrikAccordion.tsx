import { NagrikAccordion as NagrikAccordionType } from '@/lib/storage';
import Accordion from './Accordion';
import NagrikItem from './NagrikItem';

interface NagrikAccordionProps {
  accordion: NagrikAccordionType;
}

export default function NagrikAccordion({ accordion }: NagrikAccordionProps) {
  // Filter out items without URLs or labels
  const validItems = accordion.items.filter(item => item.url && item.label);

  if (validItems.length === 0) {
    return (
      <Accordion title={accordion.title}>
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-600">
            या विभागात कोणतेही फॉर्म किंवा लिंक उपलब्ध नाहीत.
          </p>
        </div>
      </Accordion>
    );
  }

  return (
    <Accordion title={accordion.title}>
      <div className="space-y-2">
        {validItems.map((item) => (
          <NagrikItem key={item.id} item={item} />
        ))}
      </div>
    </Accordion>
  );
}
