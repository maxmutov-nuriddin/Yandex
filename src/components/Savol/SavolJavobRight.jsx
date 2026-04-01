import React from "react";

const SavolJavobRight = ({ section, openItemId, onToggleItem }) => {
  return (
    <div className="rounded-2xl border border-[#e7e7ee] bg-white p-4 shadow-sm md:p-6">
      <h2 className="text-xl font-semibold text-[#232432] md:text-2xl">{section.title}</h2>

      <div className="mt-5 space-y-3">
        {section.items.map((item) => {
          const isOpen = openItemId === item.id;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-[#ececf4]"
            >
              <button
                type="button"
                onClick={() => onToggleItem(item.id)}
                className="flex w-full items-center justify-between gap-3 bg-white px-4 py-4 text-left"
              >
                <span className="text-sm font-medium text-[#2b2c3a] md:text-base">
                  {item.question}
                </span>
                <span
                  className={`text-lg leading-none text-[#5f6070] transition-transform ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[#f0f0f5] bg-[#fafafe] px-4 py-4 text-sm leading-6 text-[#4f5060] md:text-base">
                  {item.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default SavolJavobRight;
