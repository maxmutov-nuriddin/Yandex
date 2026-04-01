import React from "react";

const SavolJavobLeft = ({ sections, activeSectionId, onSectionSelect }) => {
  return (
    <aside className="rounded-2xl border border-[#e7e7ee] bg-white p-4 shadow-sm lg:sticky lg:top-4">
      <h2 className="mb-4 text-lg font-semibold text-[#232432]">Bo'limlar</h2>
      <ul className="space-y-2">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onSectionSelect(section.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                  isActive
                    ? "bg-[#f0edff] font-medium text-[#5b3dff]"
                    : "text-[#3b3c4d] hover:bg-[#f7f7fb]"
                }`}
              >
                <span>{section.title}</span>
                <span className="text-xs text-[#88899a]">{section.items.length}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default SavolJavobLeft;
