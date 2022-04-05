
import { GridItemsType } from '../../types/GridItemsType';
import * as C from './styles';
import b7Svg from '../../svgs/b7.svg';
import { items } from '../../data/items';

type Props = {
    item: GridItemsType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container 
            showBackground={item.permanetShown || item.shown}
            onClick={onClick}>
            {item.permanetShown === false && item.shown === false && 
                <C.Icon src={b7Svg}  alt=""  opacity={.1}/>
            }
            {(item.permanetShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt="" />
            }
        </C.Container>
    );
}