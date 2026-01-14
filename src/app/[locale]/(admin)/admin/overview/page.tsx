import { getDashboardStatsAction } from '@/lib/actions/admin.actions';
import { OverviewClient } from '@/components/admin/overview-client';

export default async function AdminOverviewPage() {
    const result = await getDashboardStatsAction();

    const initialData = result.success && result.data ? result.data : {
        shopCount: 0,
        eventCount: 0,
        sliderCount: 0,
        popupCount: 0,
        inquiryCount: 0,
        activities: []
    };

    return <OverviewClient data={initialData} />;
}
