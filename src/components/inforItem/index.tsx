import * as C from './styled';

type Props = {
    label: string;
    value: string;
}

export const InfoItem = ({label, value}: Props) => {
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    );
}