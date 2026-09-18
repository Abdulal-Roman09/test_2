import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function MenuFilterBar({
  categories,
  dietaryOptions,
  selectedCategory,
  selectedDietary,
  onSelectCategory,
  onToggleDietary,
  onReset,
  count,
}) {
  const isDirty = selectedCategory !== 'All' || selectedDietary.length > 0;

  return (
    <div className="mb-10 rounded-2xl border border-[#e7dfd0] bg-[#fffdf9]/80 p-5 shadow-[0_2px_14px_-6px_rgba(13,8,6,0.10)] backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-[#2e1f16]">Explore the Menu</h3>
        <div className="flex items-center gap-3">
          {isDirty && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 font-body text-xs font-medium text-[#a67c2e] transition-colors duration-200 hover:text-[#855812]"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
          <span className="rounded-full bg-[#f1e9d9] px-3 py-1 font-body text-xs font-medium text-[#5c4b3a]">
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Category */}
        <div>
          <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9c8a6f]">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 font-body text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
                    active
                      ? 'bg-espresso-950 text-gold-300 shadow-md'
                      : 'bg-[#f5efe3] text-[#5c4b3a] hover:bg-[#e9ddc6]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary */}
        <div>
          <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9c8a6f]">
            Dietary
          </p>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((tag) => {
              const active = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleDietary(tag)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 font-body text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
                    active
                      ? 'bg-gold-500 text-espresso-950 shadow-md'
                      : 'bg-[#f5efe3] text-[#5c4b3a] hover:bg-[#e9ddc6]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}