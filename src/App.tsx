import { useGameStore } from './store/gameStore';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { RosterPage } from './pages/RosterPage';
import { TitlesPage } from './pages/TitlesPage';
import { BookingPage } from './pages/BookingPage';
import { CalendarPage } from './pages/CalendarPage';
import { FeudsPage } from './pages/FeudsPage';
import { FactionsPage } from './pages/FactionsPage';
import { VenuesPage } from './pages/VenuesPage';
import { CelebritiesPage } from './pages/CelebritiesPage';
import { WritersPage } from './pages/WritersPage';
import { NXTPipelinePage } from './pages/NXTPipelinePage';

const PAGES: Record<string, React.FC> = {
  dashboard: DashboardPage,
  roster: RosterPage,
  titles: TitlesPage,
  booking: BookingPage,
  calendar: CalendarPage,
  feuds: FeudsPage,
  factions: FactionsPage,
  venues: VenuesPage,
  celebrities: CelebritiesPage,
  writers: WritersPage,
  nxt: NXTPipelinePage,
};

function App() {
  const { started, currentPage } = useGameStore();

  if (!started) return <HomePage />;

  const PageComponent = PAGES[currentPage] || DashboardPage;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PageComponent />
      </div>
    </div>
  );
}

export default App;
