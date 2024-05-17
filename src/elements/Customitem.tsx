import {Avatar} from "@nextui-org/avatar";

interface CustomOptionProps {
    innerProps: any;
    label: string;
    data: any;
}

export const customOption = ({ innerProps, label, data }:(CustomOptionProps)) => {
    return (
        <div {...innerProps} style={{ display: 'flex', alignItems: 'center' }} className={'bg-slate-200 cursor-pointer'}>
            <Avatar
                src={data.photo}
                alt={label}
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
                className={'ml-2'}
            />
            <span className={'text-center'}>{label}</span>
        </div>
    );
};

export const NoOptionsMessageCp = (props:any) => {
    return (
        <div {...props.innerProps} className="text-center text-sm py-2 bg-slate-200 cursor-pointer">
            Enter a musician name
        </div>
    );
};