import { Toast as FlowToast } from 'flowbite-react';
import { MdOutbox } from 'react-icons/md';

const Toast = () => {
  return (
    <div className="h-full absolute right-0 animate-abracadabra">
      <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default Toast;
