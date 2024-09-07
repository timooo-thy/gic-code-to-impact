'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import Navbar from '@/components/Navbar';

// Mock data for submitted requests
const mockSubmittedRequests = [
    {
        id: 1,
        instrumentName: 'Tesla Inc.',
        status: 'Approved',
        date: '2023-06-04',
    },
    { id: 2, instrumentName: 'JPY/USD', status: 'Pending', date: '2023-06-05' },
    {
        id: 3,
        instrumentName: 'Silver Futures',
        status: 'Rejected',
        date: '2023-06-06',
    },
];

export default function RecentTrade() {
    return (
        <div className='container mx-auto p-6'>
            <Navbar />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Submitted Requests Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {mockSubmittedRequests.map(request => (
                            <Card key={request.id} className='mb-4'>
                                <CardHeader>
                                    <CardTitle>{request.instrumentName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        <strong>Status:</strong> {request.status}
                                    </p>
                                    <p>
                                        <strong>Date:</strong> {request.date}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}