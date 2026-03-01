"use client";

type LeavingSiteModalProps = {
  isOpen: boolean;
  pendingUrl: string | null;
  dontShowAgain: boolean;
  onToggleDontShowAgain: (checked: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LeavingSiteModal({
  isOpen,
  pendingUrl,
  dontShowAgain,
  onToggleDontShowAgain,
  onCancel,
  onConfirm,
}: LeavingSiteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/72 px-4">
      <div
        className="w-full max-w-md border border-unbeatable-white/35 bg-industrial-black px-5 py-5 text-unbeatable-white"
        style={{
          clipPath:
            "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Leaving external site confirmation"
      >
        <p className="micro-tag text-unbeatable-white/70">[SYSTEM_AUTH]</p>
        <h3 className="mt-3 text-base font-black uppercase tracking-[0.16em] text-zzz-yellow">
          Leaving Site
        </h3>
        <p className="mt-3 text-sm text-unbeatable-white/85">
          This action opens a separate external project site in a new tab.
        </p>

        <div className="mt-3 border border-unbeatable-white/25 bg-industrial-black/70 px-3 py-2">
          <p className="micro-tag text-unbeatable-white/65">[DESTINATION_LINK]</p>
          {pendingUrl ? (
            <p className="mt-1 break-all text-xs text-unbeatable-white/88">{pendingUrl}</p>
          ) : (
            <p className="mt-1 text-xs text-unbeatable-white/70">No destination URL provided.</p>
          )}
        </div>

        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 border border-unbeatable-white/30 px-3 py-2 text-xs uppercase tracking-[0.12em] text-unbeatable-white/85">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(event) => onToggleDontShowAgain(event.target.checked)}
            className="h-3.5 w-3.5 accent-zzz-yellow"
          />
          Don&apos;t show again
        </label>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="glitch-button"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="glitch-button"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
