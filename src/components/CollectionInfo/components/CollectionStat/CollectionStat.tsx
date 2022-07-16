import Label from '../../../../components/Label/Label';

type CollectionStatProp = {
  title: string;
  value: string | number;
};

const CollectionStat = (props: CollectionStatProp) => {
  const { title, value } = props;
  return (
    <div className="w-10/12 justify-self-end	h-10 bg-gradient-to-r from-transparent via-blue-800 to-slate-700	 rounded-md p-2 flex items-center justify-between">
      <Label className="w-1/2 pl-2 text-xs font-bold dark:text-gray-400">{title}</Label>
      <Label className="w-1/2 pr-2 text-sm font-md flex justify-end overflow-hidden">{value}</Label>
    </div>
  );
};

export default CollectionStat;
