import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Filter, Info } from 'lucide-react';

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Signature Brews', 'Small Plates', 'Wood-Fired', 'Heritage Mains', 'Sweet Roots'];
  
  const menuItems = [
    { id: 1, category: 'Signature Brews', name: 'Basmati Blonde', price: '₹425', desc: 'Light, crisp ale with hints of local basmati and lemongrass.', tags: ['Signature', 'Popular'] },
    { id: 2, category: 'Signature Brews', name: 'Toit Nitro Stout', price: '₹550', desc: 'Creamy, dark stout served on nitro for a velvet finish.', tags: ['Nitro'] },
    { id: 3, category: 'Wood-Fired', name: 'The Bangalore Classic', price: '₹675', desc: 'Spiced sausage, caramelized onions, and green chilies.', tags: ['Local Favorite'] },
    { id: 4, category: 'Small Plates', name: 'Industrial Wings', price: '₹450', desc: 'Double-fried wings with a copper-heat glaze.', tags: ['Spicy'] },
    { id: 5, category: 'Wood-Fired', name: 'Oak-Smoked Paneer', price: '₹595', desc: 'Hand-stretched dough with slow-smoked local cottage cheese.', tags: ['Veg'] },
    { id: 6, category: 'Heritage Mains', name: 'Brewmaster\'s Steak', price: '₹1250', desc: 'Dry-aged beef glazed with dark stout reduction.', tags: ['Chef Choice'] },
  ];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading mb-6 italic">The Digital Ledger</h1>
          <p className="text-brand-smoke max-w-xl mx-auto uppercase tracking-[0.2em] font-bold text-xs">
            Hand-crafted in Indiranagar since 2010
          </p>
        </motion.div>
      </div>

      {/* Categories Filter */}
      <div className="container mx-auto px-6 mb-16 overflow-x-auto">
        <div className="flex justify-center min-w-max gap-4 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-brand-gold text-brand-charcoal border-brand-gold gold-glow' 
                  : 'border-brand-iron/50 text-brand-smoke hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pb-10 border-b border-brand-iron/20"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <h3 className="text-2xl font-bold font-heading text-brand-parchment group-hover:text-brand-gold transition-colors">
                        {item.name}
                      </h3>
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[8px] h-fit">{tag}</Badge>
                      ))}
                    </div>
                    <p className="text-brand-smoke text-sm leading-relaxed max-w-md italic">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-body font-bold text-brand-gold">{item.price}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="ghost" className="h-8 px-0 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-transparent">
                    <Info size={14} className="text-brand-copper" /> View Tasting Notes
                  </Button>
                  <Button variant="ghost" className="h-8 px-0 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-transparent">
                    <Filter size={14} className="text-brand-copper" /> Customize
                  </Button>
                </div>
                
                {/* Hover Glow Decoration */}
                <div className="absolute -inset-4 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-6 mt-32 text-center">
        <div className="bg-brand-obsidian p-12 md:p-20 border border-brand-iron/30 rounded-[8px] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading italic">Craving a cold one?</h2>
            <p className="text-brand-smoke uppercase tracking-widest text-sm font-bold">
              We deliver our fresh brews and wood-fired mains to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button size="lg" variant="maroon">Order Online</Button>
               <Button size="lg" variant="outline">Gift Cards</Button>
            </div>
          </div>
          
          {/* Background Decorative Element */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-gold/5 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-copper/5 blur-3xl rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
