import MydashboardLayout from "@/components/domains/mydashboard/MydashboardLayout";
import DashboardList from "@/components/domains/mydashboard/DashboardList";
import InvitedDashboardList from "@/components/domains/mydashboard/InvitationList";
import BaseContainer from "@/components/commons/BaseContainer/BaseContainer";
import { useRouter } from "next/router";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getDashBoards from "@/api/getDashBoards";
import getReceivedDashboardInvitations from "@/api/getReceivedDashboardInvitations";
import withAuthNoneExist from "@/utils/withAuthNoneExist";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboardList"],
    queryFn: () => getDashBoards("pagination", null, 5, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ["receivedDashboardInvitationsList"],
    queryFn: () => getReceivedDashboardInvitations(null, null),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default withAuthNoneExist(function MydashboardPage({ dehydratedState }: any) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <HydrationBoundary state={dehydratedState}>
      <BaseContainer currentPath={currentPath}>
        <MydashboardLayout dashboardList={<DashboardList />} invitedDashboardList={<InvitedDashboardList />} />
      </BaseContainer>
    </HydrationBoundary>
  );
});
