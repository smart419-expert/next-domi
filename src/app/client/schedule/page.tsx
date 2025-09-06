'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguageChange } from '@/contexts/language-context';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ClientSchedule() {
  const language = useLanguageChange();
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  
  // Simple translation function for this page
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'schedule.title': 'Schedule',
        'schedule.description': 'Manage your meetings and appointments with your financial team.',
        'schedule.schedule_meeting': 'Schedule Meeting',
        'schedule.upcoming': 'Upcoming',
        'schedule.this_month': 'This Month',
        'schedule.completed': 'Completed',
        'schedule.meetings_scheduled': 'Meetings scheduled',
        'schedule.december_2024': 'December 2024',
        'schedule.total_meetings': 'Total meetings',
        'schedule.new_meeting': 'Schedule New Meeting',
        'schedule.create_meeting': 'Create a new meeting with your financial advisor',
        'schedule.meeting_title': 'Meeting Title',
        'schedule.date': 'Date',
        'schedule.time': 'Time',
        'schedule.meeting_type': 'Meeting Type',
        'schedule.video_call': 'Video Call',
        'schedule.in_person': 'In-Person',
        'schedule.phone_call': 'Phone Call',
        'schedule.notes_optional': 'Notes (Optional)',
        'schedule.any_additional_notes': 'Any additional notes or agenda items...',
        'schedule.cancel': 'Cancel',
        'schedule.upcoming_meetings': 'Upcoming Meetings',
        'schedule.scheduled_meetings': 'Your scheduled meetings and appointments',
        'schedule.meeting_history': 'Meeting History',
        'schedule.completed_meetings': 'Your completed meetings and appointments',
        'schedule.no_upcoming_meetings': 'No upcoming meetings',
        'schedule.schedule_meeting_to_start': 'Schedule a meeting to get started.',
        'schedule.no_completed_meetings': 'No completed meetings',
        'schedule.meeting_history_will_appear': 'Your meeting history will appear here.',
        'schedule.cancelled': 'Cancelled',
        'schedule.unknown': 'Unknown',
      },
      es: {
        'schedule.title': 'Programar',
        'schedule.description': 'Gestiona tus reuniones y citas con tu equipo financiero.',
        'schedule.schedule_meeting': 'Programar Reunión',
        'schedule.upcoming': 'Próximas',
        'schedule.this_month': 'Este Mes',
        'schedule.completed': 'Completadas',
        'schedule.meetings_scheduled': 'Reuniones programadas',
        'schedule.december_2024': 'Diciembre 2024',
        'schedule.total_meetings': 'Total de reuniones',
        'schedule.new_meeting': 'Programar Nueva Reunión',
        'schedule.create_meeting': 'Crear una nueva reunión con tu asesor financiero',
        'schedule.meeting_title': 'Título de la Reunión',
        'schedule.date': 'Fecha',
        'schedule.time': 'Hora',
        'schedule.meeting_type': 'Tipo de Reunión',
        'schedule.video_call': 'Llamada de Video',
        'schedule.in_person': 'En Persona',
        'schedule.phone_call': 'Llamada Telefónica',
        'schedule.notes_optional': 'Notas (Opcional)',
        'schedule.any_additional_notes': 'Cualquier nota adicional o elementos de agenda...',
        'schedule.cancel': 'Cancelar',
        'schedule.upcoming_meetings': 'Reuniones Próximas',
        'schedule.scheduled_meetings': 'Tus reuniones y citas programadas',
        'schedule.meeting_history': 'Historial de Reuniones',
        'schedule.completed_meetings': 'Tus reuniones y citas completadas',
        'schedule.no_upcoming_meetings': 'No hay reuniones próximas',
        'schedule.schedule_meeting_to_start': 'Programa una reunión para comenzar.',
        'schedule.no_completed_meetings': 'No hay reuniones completadas',
        'schedule.meeting_history_will_appear': 'Tu historial de reuniones aparecerá aquí.',
        'schedule.cancelled': 'Cancelada',
        'schedule.unknown': 'Desconocida',
      }
    };
    
    return translations[language]?.[key] || key;
  };
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    type: 'video',
    notes: ''
  });

  const meetings = [
    {
      id: 1,
      title: 'Quarterly Review Meeting',
      date: '2024-12-15',
      time: '10:00 AM',
      type: 'video',
      advisor: 'Sarah Johnson',
      status: 'upcoming',
      notes: 'Review Q4 performance and discuss next quarter strategy'
    },
    {
      id: 2,
      title: 'Investment Strategy Discussion',
      date: '2024-12-20',
      time: '2:00 PM',
      type: 'in-person',
      advisor: 'Michael Chen',
      status: 'upcoming',
      notes: 'Discuss portfolio rebalancing and new investment opportunities'
    },
    {
      id: 3,
      title: 'Account Update Call',
      date: '2024-11-30',
      time: '3:30 PM',
      type: 'phone',
      advisor: 'Sarah Johnson',
      status: 'completed',
      notes: 'Monthly account review and updates'
    },
    {
      id: 4,
      title: 'Tax Planning Session',
      date: '2024-11-15',
      time: '11:00 AM',
      type: 'video',
      advisor: 'Michael Chen',
      status: 'completed',
      notes: 'Year-end tax planning and optimization strategies'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return t('schedule.upcoming');
      case 'completed':
        return t('schedule.completed');
      case 'cancelled':
        return t('schedule.cancelled');
      default:
        return t('schedule.unknown');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-blue-600" />;
      case 'in-person':
        return <MapPin className="h-4 w-4 text-green-600" />;
      case 'phone':
        return <User className="h-4 w-4 text-purple-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
  const completedMeetings = meetings.filter(m => m.status === 'completed');

  const handleCreateMeeting = () => {
    // In a real app, this would create a new meeting
    console.log('Creating meeting:', newMeeting);
    setShowNewMeeting(false);
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      type: 'video',
      notes: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('schedule.title')}</h1>
            <p className="text-gray-600">
              {t('schedule.description')}
            </p>
          </div>
          <Button onClick={() => setShowNewMeeting(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('schedule.schedule_meeting')}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('schedule.upcoming')}</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {upcomingMeetings.length}
            </div>
            <p className="text-xs text-gray-500">{t('schedule.meetings_scheduled')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('schedule.this_month')}</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {meetings.filter(m => m.date.startsWith('2024-12')).length}
            </div>
            <p className="text-xs text-gray-500">{t('schedule.december_2024')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('schedule.completed')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {completedMeetings.length}
            </div>
            <p className="text-xs text-gray-500">{t('schedule.total_meetings')}</p>
          </CardContent>
        </Card>
      </div>

      {/* New Meeting Modal */}
      {showNewMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>{t('schedule.new_meeting')}</CardTitle>
              <CardDescription>
                {t('schedule.create_meeting')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">{t('schedule.meeting_title')}</Label>
                <Input
                  id="title"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  placeholder="e.g., Quarterly Review"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">{t('schedule.date')}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">{t('schedule.time')}</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="type">{t('schedule.meeting_type')}</Label>
                <select
                  id="type"
                  value={newMeeting.type}
                  onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="video">{t('schedule.video_call')}</option>
                  <option value="in-person">{t('schedule.in_person')}</option>
                  <option value="phone">{t('schedule.phone_call')}</option>
                </select>
              </div>
              <div>
                <Label htmlFor="notes">{t('schedule.notes_optional')}</Label>
                <Textarea
                  id="notes"
                  value={newMeeting.notes}
                  onChange={(e) => setNewMeeting({...newMeeting, notes: e.target.value})}
                  placeholder={t('schedule.any_additional_notes')}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateMeeting} className="flex-1">
                  {t('schedule.schedule_meeting')}
                </Button>
                <Button variant="outline" onClick={() => setShowNewMeeting(false)}>
                  {t('schedule.cancel')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upcoming Meetings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('schedule.upcoming_meetings')}</CardTitle>
          <CardDescription>
            {t('schedule.scheduled_meetings')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(meeting.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                    <p className="text-sm text-gray-500">
                      with {meeting.advisor} • {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                    </p>
                    {meeting.notes && (
                      <p className="text-xs text-gray-400 mt-1">{meeting.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                    {getStatusText(meeting.status)}
                  </span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {upcomingMeetings.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('schedule.no_upcoming_meetings')}</h3>
              <p className="text-gray-500">{t('schedule.schedule_meeting_to_start')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meeting History */}
      <Card>
        <CardHeader>
          <CardTitle>{t('schedule.meeting_history')}</CardTitle>
          <CardDescription>
            {t('schedule.completed_meetings')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(meeting.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                    <p className="text-sm text-gray-500">
                      with {meeting.advisor} • {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                    </p>
                    {meeting.notes && (
                      <p className="text-xs text-gray-400 mt-1">{meeting.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                    {getStatusText(meeting.status)}
                  </span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {completedMeetings.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('schedule.no_completed_meetings')}</h3>
              <p className="text-gray-500">{t('schedule.meeting_history_will_appear')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
