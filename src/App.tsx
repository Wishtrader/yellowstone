import Dropdown from "./components/Dropdown";
import Button from "./components/Button";
import TagBtn from "./components/TagBtn";
import {useQuery} from "react-query";
import ListItem from "./components/ListItem";
import {useEffect} from "react";
import Spinner from "./components/Spinner";
import {useFilters} from "./store";

interface DropdownData {
  seasons: string;
  location: string;
  category: string;
}

interface Item {
  id: string;
  slug: string;
  phone: string;
  name: string;
  addressfull: string;
  address: string;
  website: string;
  image: string;
  advertiser: string;
  category: string;
  location: string;
  seasons: string;
}


// async function fetchLodgings() {
//   const apiUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:sWGvXIXK/yellowstone';
//   const {data} = await axios.get(apiUrl);
//   return data;
// }


  async function fetchLodgings() {
  const apiUrl = 'https://api.webflow.com/collections/649a06edc4a80543ae627458/items?access_token=0b3e056fcac319b61b225cfb2eaae45ea52c1bddb5a76d110c600d2836a2e245';
  const options = {
  method: 'GET',
  headers: {
  accept: 'application/json',
}
};
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  console.log(data);
  return data.items;
}



function App() {

  const {data, isError, isLoading} = useQuery(['lodgings'],() => fetchLodgings());
  const filters = useFilters((state: any) => [...state.filters]);
  const removeFilters = useFilters((state: any) => state.removeAllFilters);
  const removeFilter = useFilters((state: any) => state.removeFilter);

  const filteredItems = (): Item[] => {
    if (filters.length === 0) {
      return data;
    }
    return data?.filter((item: Item) => {
      return filters.every((filter: string) => {
        return item.location?.toLowerCase().includes(filter) ||
          item.seasons?.toLowerCase().includes(filter) ||
          item.category?.toLowerCase().includes(filter);
      });
    });
  }

  const filteredData: Item[] = filteredItems();
  console.log('filteredData', filteredData)

  useEffect(() => {
    window.localStorage.setItem('filters', JSON.stringify([...filters]));
    console.log('filters', filters)
  }, [filters])

  const removeFilterHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target: HTMLElement = e.target as HTMLImageElement;
    removeFilter(target.getAttribute('data-value'));
  }
  const removeAllFiltersHandler = (): void => {
    removeFilters();
  }

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
    data.map((item) => {
      propertyValues.add(item[property] as string);
    });
    return Array.from(propertyValues);
  }

  const listData: DropdownData[] = data;

  const cities: string[] = getPropertyValues(listData, 'location');
  const seasons: string[] = getPropertyValues(listData, 'seasons');
  const category: string[] = getPropertyValues(listData, 'category');



  console.log(filters)


  return (
    <>
      <div className="container mx-auto max-w-[73vw] flex flex-col pt-10">
        <div className='flex justify-between'>
          <div className="flex">
            <Dropdown
              title='Season'
              icon='https://yellowstone-opal.vercel.app/assets/arrow.svg'
              iconAlt='Arrow'
              listItems={seasons}
            />
            <Dropdown
              title='Location'
              icon='https://yellowstone-opal.vercel.app/assets/arrow.svg'
              iconAlt='Arrow'
              listItems={cities}
            />
            <Dropdown
              title='Type'
              icon='https://yellowstone-opal.vercel.app/assets/arrow.svg'
              iconAlt='Arrow'
              listItems={category}
            />
            <Dropdown
              title='Sort by'
              icon='https://yellowstone-opal.vercel.app/assets/arrow.svg'
              iconAlt='Arrow'
              listItems={[]}
            />
          </div>
          <Button title={'Map'} icon='https://yellowstone-opal.vercel.app/assets/map.svg' fill='solid' />
        </div>
        <div className='flex items-center my-[1.5vw]'>
          {filters.length > 0 && [...filters].map((el) => {
            return (
                <TagBtn key={el} filterName={el} icon='https://yellowstone-opal.vercel.app/assets/close.svg'
                        onClick={removeFilterHandler}
                />
          )})}
          {filters.length > 1 && <div className='ml-4'>
              <Button title='Clear All' fill='ghost' onClick={removeAllFiltersHandler} />
          </div>}
        </div>
        <div className='flex flex-col'>
          <p className="text-black/40 text-[0.9vw]">Found {filteredData.length} records</p>
          {filteredData.map((el: Item) => {
              return (
                <ListItem
                  id={el.id}
                  key={el.slug}
                  phone={el.phone}
                  name={el.name}
                  city={el.addressfull}
                  address={el.address}
                  website={el.website}
                  image={el.image}
                  advertiser={el.advertiser}
                />
              )
            }
          )}
        </div>
      </div>
    </>
  )
}

export default App
