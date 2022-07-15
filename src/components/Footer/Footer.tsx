import { Footer as FlowFooter } from 'flowbite-react';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <FlowFooter container={true}>
      <div className="w-full">
        <FlowFooter.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowFooter.Copyright href="#" by=" Space Powder" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowFooter.Icon href="#" icon={BsTwitter} />
            <FlowFooter.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </FlowFooter>
  );
};

export default Footer;
