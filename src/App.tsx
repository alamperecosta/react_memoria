import * as C from './App.styles';
import { useEffect, useState } from 'react';

import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from './components/inforItem';
import { GridItem } from './components/GridItem';

import { GridItemsType } from './types/GridItemsType';
import { items } from './data/items';
import { formatTimeElapsed } from './helprs/formatTIme.Elapsed';



const App =  () => {
  const [playing, setPlayIng] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemsType[]>([]);


  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if(shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2){
        
        if(opened[0].item === opened[1].item){
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanetShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShowCount(0);
          }, 1000);
        }
        

        setMoveCount(moveCount => moveCount + 1);
      }
    } 
  }, [shownCount, gridItems]);

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanetShown === true)){
     setPlayIng(false); 
    }
  }, [moveCount, gridItems])

  const resetAndCreateGrid =  () => {
    // passo 1 - resetar p jogo
      setTimeElapsed(0);
      setMoveCount(0);
      setShowCount(0);
       
    // passo 2 criar o grid e comecar o jogo
    // 2.1 - criar um grid vazio
    let tmpGrid: GridItemsType[] = [];
    for(let i = 0; i < (items.length * 2); i++) {
        tmpGrid.push({
          item: null,
          shown: false,
          permanetShown: false
        });
    }
    // 2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        } 
        tmpGrid[pos].item = i;
      }
    }
    // 2.3 - jogar o grid
    setGridItems(tmpGrid);
    // passo 3 - comecar o jogo  
    setPlayIng(true);

  }

  const  handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2){
      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permanetShown === false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true;
        setShowCount(shownCount + 1);
      }

      setGridItems(tmpGrid);
    }
  }
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="logo-DevMemory" />
        </C.LogoLink>

        <C.infoArea>
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.infoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => 
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          )}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;
