import React from 'react'
import s from "./BuildSneshSkazka.module.scss"
import Container from "components/markup/Container/Container";
import Wrapper from "components/markup/Wrapper/Wrapper";
import FbsEntranceContainer from "components/fieldsBuildSelect/FbsEntrance/FbsEntranceContainer";
import FbsFloorContainer from "components/fieldsBuildSelect/FbsFloor/FbsFloorContainer";
import FbsTypeContainer from "components/fieldsBuildSelect/FbsType/FbsTypeContainer";
import FbsRoomContainer from "components/fieldsBuildSelect/FbsRoom/FbsRoomContainer";
import {constBuilds} from "lib/js/constants";
import FbsTableComponent from "components/fieldsBuildSelect/FbsTable/FbsTableComponent";
import {idInfo, idinfo} from "lib/js/ids";



const BuildSneshSkazka = ({
                            places, changeFieldOfBuildSelect, nameBuild = constBuilds.SNESH_SKAZKA,
                             ...data
                          }) => {

  return (
    <>
      <Wrapper>
        <Container className={s.container}>
          <h1 className={s.h1}>Информация по квартирам</h1>

          <div className={s.wrapper}>
            <div id={idInfo} className={s.elemSelect}>

              <p className={s.selectTitle}>Фильтр по&nbsp;типу&nbsp;квартиры</p>
              <FbsTypeContainer nameBuild={nameBuild}/>

              <p className={s.selectTitle}>Фильтр по&nbsp;подъезду</p>
              <FbsEntranceContainer nameBuild={nameBuild}/>

              <p className={s.selectTitle}>Фильтр по&nbsp;этажу</p>
              <FbsFloorContainer nameBuild={nameBuild}/>

              <p className={s.selectTitle}>Результат&nbsp;фильтра<br/><i>(свободные квартиры)</i></p>
              <FbsRoomContainer nameBuild={nameBuild}/>
            </div>

            <FbsTableComponent nameBuild={nameBuild}/>

          </div>

        </Container>
      </Wrapper>
    </>
  )
}

export default BuildSneshSkazka
