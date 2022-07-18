import { Toast as FlowToast } from 'flowbite-react';
import { ReactNode, useEffect } from 'react';
import { MdOutbox } from 'react-icons/md';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiWindowClose, BiWindowOpen } from 'react-icons/bi';

const autoDismissAfterMs = 3250;

type ToastVariant = 'send' | 'info' | 'success' | 'failure' | 'connected' | 'disconnected';

export type ToastType = {
  id: string;
  variant: string;
  title: string;
  text: string;
  remove: () => void;
};

const getIcon = (variant: ToastVariant): ReactNode => {
  const className = 'h-5 w-5';
  switch (variant) {
    case 'send':
      return <MdOutbox className={className} />;
    case 'info':
      return <AiOutlineInfoCircle className={className} />;
    case 'success':
      return <AiOutlineCheckCircle className={className} />;
    case 'failure':
      return <AiOutlineCloseCircle className={className} />;
    case 'connected':
      return <BiWindowOpen className={className} />;
    case 'disconnected':
      return <BiWindowClose className={className} />;
    default:
      return null;
  }
};

const Toast = (props: ToastType) => {
  const { variant, title, text, remove } = props;

  useEffect(() => {
    const timeoutHandle = setTimeout(remove, autoDismissAfterMs);
    return () => clearTimeout(timeoutHandle);
  }, [remove]);

  return (
    <div className="w-[300px] animate-abracadabra">
      <FlowToast>
        <div className="flex !items-start">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300">
            {getIcon(variant as ToastVariant)}
          </div>
          <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </span>
            <div className="mb-2 text-sm font-normal">{text}</div>
          </div>
          <FlowToast.Toggle />
        </div>
      </FlowToast>
    </div>
  );
};

export default Toast;
