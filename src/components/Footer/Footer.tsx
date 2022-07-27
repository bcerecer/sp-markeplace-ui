import { Footer as FlowFooter } from 'flowbite-react';
import { BsTwitter } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { spacePowderContactEmail, spacePowderTwitterUrl } from 'src/utils/contants';

const Footer = () => {
  return (
    <FlowFooter container={true}>
      <div className="w-full">
        <FlowFooter.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowFooter.Copyright href="#" by=" Space Powder" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowFooter.Icon href={spacePowderTwitterUrl} icon={BsTwitter} />
            {/* TODO: Create discord and add to footer */}
            {/* <FlowFooter.Icon href="#" icon={BsDiscord} /> */}
            <FlowFooter.Icon href={`mailto:${spacePowderContactEmail}`} icon={HiMail} />
          </div>
        </div>
      </div>
    </FlowFooter>
  );
};

export default Footer;
