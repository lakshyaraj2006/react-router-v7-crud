export default function WarningAlert() {
  return (
    <div className="w-full border-b border-yellow-300 bg-yellow-100">
      <div className="mx-auto flex items-start gap-3 px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-200 text-yellow-900 dark:bg-yellow-500/20 dark:text-yellow-300">
          ⚠️
        </div>

        <div>
          <h2 className="text-sm font-semibold text-yellow-950">
            Restricted Actions
          </h2>

          <p className="text-sm text-yellow-900">
            Create, update, and delete actions are currently disabled
            due to security and moderation reasons.
          </p>
        </div>
      </div>
    </div>
  );
}