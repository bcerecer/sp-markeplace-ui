import { Toast as FlowToast } from 'flowbite-react';
import { useEffect } from 'react';
import { MdOutbox } from 'react-icons/md';

const autoDismissAfterMs = 3250;

const Toast = ({ content, autoDismiss, remove }) => {
  useEffect(() => {
    if (autoDismiss) {
      const timeoutHandle = setTimeout(remove, autoDismissAfterMs);

      return () => clearTimeout(timeoutHandle);
    }
  }, [autoDismiss, remove]);

  return (
    <div className="animate-abracadabra">
      <FlowToast>
        <div className="flex !items-start">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300">
            <MdOutbox className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Sent</span>
            <div className="mb-2 text-sm font-normal">Collection submitted for review</div>
          </div>
          <FlowToast.Toggle />
        </div>
      </FlowToast>
    </div>
  );
};

export default Toast;
