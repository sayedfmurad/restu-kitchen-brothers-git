import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { MdDeliveryDining } from "react-icons/md";
import { PiBag } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";


export function UnstyledTabsIntroductionTimes({obj,setspaterodernow,onChangeToDeliveryTime}) {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
    },[])
    React.useEffect(() => {
        if(value === 0)
        setspaterodernow("d-none")
        else
        onChangeToDeliveryTime()
        
        obj.order.type = value===0?"Jetzt":"Später"
    }, [value]);
  return (
    <Tabs  defaultValue={value} onChange={(e)=>
        {
            setValue(parseInt(e.target.closest(".parentbtn").getAttribute("tabindex")))
        }
        }>
      <TabsList>
        <Tab id="jetztBtn" className='parentbtn' value={0} tabIndex={0} >Jetzt&nbsp;</Tab>
        <Tab value={1} className='parentbtn' tabIndex={1} >Später&nbsp;<IoTimeOutline style={{paddingTop:"0px",height:"1.3rem",width:"1.5rem"}} /></Tab>
      </TabsList>
    </Tabs>
  );
}
export  function UnstyledTabsIntroduction({obj,setspaterodernow,onChangeToLiefern,onChangeToAbohlen}) {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        if(value===0){
            onChangeToLiefern()
            if(document.getElementById("jetztBtn"))
            document.getElementById("jetztBtn").click()
        }else{  
            onChangeToAbohlen()
        }
        obj.order.type = value===0?"Liefern":"Abholen"
    }, [value]);
  return (
    <Tabs defaultValue={value} onChange={
        (e)=>
        {
            setValue(parseInt(e.target.closest(".parentbtn").getAttribute("tabindex")))
        }
    }>
      <TabsList>
        <Tab value={0} tabIndex={0} className='parentbtn' >Liefern&nbsp;<MdDeliveryDining style={{paddingTop:"0px",height:"1.4em",width:"1.5rem"}} /></Tab>
        <Tab value={1} tabIndex={1} className='parentbtn' >Abholen&nbsp;<PiBag style={{paddingTop:"0px",height:"1.4em",width:"1.5rem"}} /></Tab>
      </TabsList>
    </Tabs>
  );
}

const blue = {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  };

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Tab = styled(BaseTab)`
height: 33px;
  width: 120px;
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  background-color: transparent;
  min-width: 50px;
  padding: 7px 15px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  
  min-width: 50px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  width: 245px;
  height: 37px;
  background-color: #198755;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);
