import Dropdown from "./components/Dropdown";
import Button from "./components/Button";
import TagBtn from "./components/TagBtn";
import axios from 'axios';
import {useQuery} from "react-query";
import ListItem from "./components/ListItem";
import {useState} from "react";
import NavigateBtn from "./components/NavigateBtn";
import Spinner from "./components/Spinner";
import {useFilters} from "./store";

interface DropdownData {
  Seasons: string;
  Location: string;
  Category: string;
}

interface Item {
  id: string;
  Phone: string;
  Name: string;
  City_State_ZIP: string;
  Address: string;
  Website: string;
  Image: string;
  Advertiser: string;
}

async function fetchLodgings(page = 1) {
  const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:sWGvXIXK/yellowstone?page=${page}`;
  const {data} = await axios.get(apiUrl);
  return data;
}

function App() {
  const [page, setPage] = useState(1);
  const {data, isError, isLoading} = useQuery(['lodgings', page],
    () => fetchLodgings(page),
    {keepPreviousData: true}
    );
  const filters: Set<string> = useFilters((state: any) => new Set(state.filters));

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Loading Error!</h3>
  }
  if (!data) {
    return <h3>No Data</h3>
  }

  function getPropertyValues<T, K extends keyof T>(data: T[], property: K): string[] {
    const propertyValues: Set<string> = new Set();
    data.forEach((item) => {
      propertyValues.add(item[property] as string);
    });
    return Array.from(propertyValues);
  }

  const listData: DropdownData[] = data.items;

  const cities: string[] = getPropertyValues(listData, 'Location');
  const seasons: string[] = getPropertyValues(listData, 'Seasons');
  const category: string[] = getPropertyValues(listData, 'Category');


  function prevHandler() {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  function nextHandler() {
    setPage((prev) => prev + 1)
  }

  console.log(filters)

  return (
    <>
      <div className="container mx-auto max-w-[73vw] flex flex-col pt-10">
        <div className='flex justify-between'>
          <div className="flex">
            <Dropdown
              title='Season'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={seasons}
            />
            <Dropdown
              title='Location'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={cities}
            />
            <Dropdown
              title='Type'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={category}
            />
            <Dropdown
              title='Sort by'
              icon='./assets/arrow.svg'
              iconAlt='Arrow'
              listItems={[]}
            />
          </div>
          <Button title={'Map'} icon='./assets/map.svg' fill='solid' />
        </div>
        <div className='flex items-center my-[1.5vw]'>
          <TagBtn tagName='Madison' icon='./assets/close.svg' />
          <div className='ml-4'>
            <Button title='Clear All' fill='ghost' />
          </div>
        </div>
        <div className='flex flex-col'>
          {data.items.map((el: Item) => {
              return (
                <ListItem
                  id={el.id}
                  key={el.id}
                  phone={el.Phone}
                  name={el.Name}
                  city={el.City_State_ZIP}
                  address={el.Address}
                  website={el.Website}
                  image={el.Image}
                  advertiser={el.Advertiser}
                />
              )
            }
          )}
        </div>
        <div className='flex mx-auto my-10'>
          <NavigateBtn onClick={prevHandler} page={page}>{'< Previous'}</NavigateBtn>
          <NavigateBtn onClick={nextHandler}>{'Next >'}</NavigateBtn>
        </div>
      </div>
    </>
  )
}

export default App
