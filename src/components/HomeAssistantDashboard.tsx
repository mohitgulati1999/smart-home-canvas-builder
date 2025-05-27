
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardSection from './DashboardSection';
import EntityCard from './EntityCard';
import MediaCard from './MediaCard';
import PersonCard from './PersonCard';

const HomeAssistantDashboard: React.FC = () => {
  const vardagsrumEntities = [
    { id: '1', type: 'light', name: 'Belysning', state: 'off', room: 'Av' },
    { id: '2', type: 'light', name: 'Hörnlampa', state: 'off', room: 'Av' },
    { id: '3', type: 'tv', name: 'TV', state: 'off', room: 'Av' },
    { id: '4', type: 'light', name: 'Balkong', state: 'off', room: 'Av' },
  ];

  const studioEntities = [
    { id: '5', type: 'light', name: 'Datorlampa', state: 'on', room: 'På', value: '100%' },
    { id: '6', type: 'light', name: 'Taklampor', state: 'on', room: 'På', value: '100%' },
    { id: '7', type: 'monitor', name: 'Dator', state: 'on', room: 'På' },
    { id: '8', type: 'speaker', name: 'Monitorer', state: 'off', room: 'Av' },
  ];

  const sovrumEntities = [
    { id: '9', type: 'light', name: 'Sänglampor', state: 'on', room: 'På', value: '50%' },
    { id: '10', type: 'climate', name: 'Klimat', state: 'off', room: 'Av', value: '25°C' },
    { id: '11', type: 'speaker', name: 'Playstation', state: 'off', room: 'Av' },
    { id: '12', type: 'tv', name: 'TV²', state: 'on', room: 'På' },
  ];

  const ovrigtEntities = [
    { id: '13', type: 'sensor', name: 'Badrum', state: 'off', room: 'Av' },
    { id: '14', type: 'fan', name: 'Fläkt²', state: 'on', room: 'På' },
    { id: '15', type: 'sensor', name: 'Garderob', state: 'off', room: 'Av' },
    { id: '16', type: 'sensor', name: 'Hall', state: 'off', room: 'Av' },
  ];

  const hemmaEntities = [
    { id: '17', type: 'switch', name: 'Stäng allt', state: 'off', room: 'Auto' },
    { id: '18', type: 'home', name: 'Hemma', state: 'off', room: 'Auto' },
  ];

  const persons = [
    { name: 'Mattias', status: 'Ja', duration: '6h' },
    { name: 'Sanja', status: 'Ja', duration: '9h' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <DashboardSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl">
          <DashboardSection title="Vardagsrum" columns={4}>
            {vardagsrumEntities.map(entity => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </DashboardSection>

          <DashboardSection title="Studio" columns={4}>
            {studioEntities.map(entity => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </DashboardSection>

          <DashboardSection title="Sovrum" columns={4}>
            {sovrumEntities.map(entity => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </DashboardSection>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <DashboardSection title="Media" columns={1}>
              <MediaCard 
                title="Senast tillagt"
                subtitle="The Rehearsal S01E03"
                image=""
                className="col-span-1"
              />
            </DashboardSection>

            <DashboardSection title="Övrigt" columns={2}>
              {ovrigtEntities.map(entity => (
                <EntityCard key={entity.id} entity={entity} size="small" />
              ))}
            </DashboardSection>

            <DashboardSection title="Hemma" columns={2}>
              {persons.map(person => (
                <PersonCard 
                  key={person.name}
                  name={person.name}
                  status={person.status}
                  duration={person.duration}
                />
              ))}
              {hemmaEntities.map(entity => (
                <EntityCard key={entity.id} entity={entity} size="small" />
              ))}
            </DashboardSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAssistantDashboard;
