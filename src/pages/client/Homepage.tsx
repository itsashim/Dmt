import { useEffect } from "react";
import {
  Activities,
  ClientContainer,
  Download,
  EventCard,
  Hero,
  PlaceCard,
  Section,
} from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelectors";
import { RootAppState } from "../../redux/store";
import { getAllEvents } from "../../redux/actions/events";
import { getPlaces } from "../../redux/actions/places";

const Homepage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getPlaces());
  }, [dispatch]);

  const { places } = useAppSelector((state: RootAppState) => state.places);
  const { events } = useAppSelector((state: RootAppState) => state.events);

  console.log("Events:", events);
  console.log(events.length);

  return (
    <>
      <Hero />
      <Activities data={places} />
      <Section>
        <ClientContainer>
          <h2
            className={`text-center text-dark-blue text-3xl md:text-5xl font-bold leading-tight`}
          >
            Featured
          </h2>
          <div
            className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10`}
          >
            {places.map((item, i) => (
              <PlaceCard data={item} key={i} />
            ))}
          </div>
        </ClientContainer>
      </Section>
      <Download />
      <Section>
        <ClientContainer>
          <h2
            className={`text-center text-dark-blue text-3xl md:text-5xl font-bold leading-tight`}
          >
            Upcoming Events
          </h2>
          <div
            className={`grid gap-8 grid-flow-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10`}
          >
            {events.map((item, i) => (
              <EventCard data={item} key={i} />
            ))}
          </div>
        </ClientContainer>
      </Section>
    </>
  );
};

export default Homepage;
