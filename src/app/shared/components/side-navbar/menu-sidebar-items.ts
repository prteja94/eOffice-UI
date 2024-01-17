import { RouteInfo } from './menu-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
     {
        path: '/admin/home',
        title: 'Home',
        icon: '#home',
        class: '',
        extralink: false,
        submenu: [],
        roles: ['Admin', 'User', 'Dev'],
     },
  
      {
        path: '',
        title: 'Administration',
        icon: '#admin',
        class: 'has-arrow',
        extralink: false,
        roles: ['Admin', 'User'],
        submenu: [
        
          {
            path: 'administration/org-type',
            title: 'Org Type',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/org-unit',
            title: 'Org Unit',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
         
          {
            path: 'administration/role-master',
            title: 'Role Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/priority-master',
            title: 'Priority Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/privilege-master',
            title: 'Privilege Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
       
          {
            path: 'administration/action-master',
            title: 'Action Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/location-master',
            title: 'External Location Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/permission-master',
            title: 'Assignment Permission Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
       
          {
            path: 'administration/classification-master',
            title: 'Classification Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/type-master',
            title: 'Document Type Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/user-master',
            title: 'User Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/user-mapping',
            title: 'User Mapping',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/folder-master',
            title: 'Folder Master',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'administration/folder-permission',
            title: 'Folder Permission',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
        
        ],
  },
  {
    path: '',
    title: 'Scanning',
    icon: '#eScan',
    class: 'has-arrow',
    extralink: false,
    roles: ['Admin', 'User'],
    submenu: [
      {
        path: 'ScanningIndex',
        title: 'Scanning & Indexing',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'ScanningIndex/ScanSearch',
        title: 'Scan Document Search',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      }
    ],
  },
  {
    path: 'ejob',
    title: 'E-Job',
    icon: '#eJob',
    class: '',
    extralink: false,
    roles: ['Admin', 'User'],
    submenu: [],
},
{
  path: '',
  title: 'Queues',
  icon: '#queues',
  class: 'has-arrow',
  extralink: false,
  roles: ['Admin', 'User'],
  submenu: [
    {
      path: 'democomponent',
      title: 'Inbox',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Outbox',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Assigned',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Archieved',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Suspended',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Closed',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Forwarded',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
  ],
},
{
  path: '',
  title: 'Delegation',
  icon: '#delegation',
  class: 'has-arrow',
  extralink: false,
  roles: ['Admin', 'User'],
  submenu: [
    {
      path: 'democomponent',
      title: 'Delegation History',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Delegation Inbox',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    },
    {
      path: 'democomponent',
      title: 'Delegate to User',
      icon: '',
      class: '',
      extralink: false,
      submenu: [],
    }
  ],
  },
  {
    path: '',
    title: 'System Updates',
    icon: '#updates',
    class: 'has-arrow',
    extralink: false,
    roles: ['Admin', 'User'],
    submenu: [
      {
        path: 'democomponent',
        title: 'Send System Updates',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'democomponent',
        title: 'System Updates Inbox',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      }
    ],
  },


  {
    path: '',
    title: 'Circular',
    icon: '#circular',
    class: 'has-arrow',
    extralink: false,
    roles: ['Admin', 'User'],
    submenu: [
      {
        path: 'democomponent',
        title: 'Send Circular',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'democomponent',
        title: 'Circular Inbox',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      }
    ],
  },
  {
    path: '',
    title: 'Work Flows',
    icon: '#work',
    class: 'has-arrow',
    extralink: false,
    roles: ['Admin', 'User'],
    submenu: [
      {
        path: 'democomponent',
        title: 'Inbox',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'democomponent',
        title: 'Oubox',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'democomponent',
        title: 'Closed',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: '',
        title: 'Submit a Form',
        icon: '#form',
        class: 'submenu',
        extralink: false,
        submenu: [
          {
            path: 'democomponent',
            title: 'Request a Car',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'democomponent',
            title: 'Short Leave',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'democomponent',
            title: 'Normal Leave',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          },
          {
            path: 'democomponent',
            title: 'Permission to Go Outbox',
            icon: '',
            class: '',
            extralink: false,
            submenu: [],
          }
        ],
      }
    ],
  },
  {
    path: 'userGroup',
    title: 'User Group',
    icon: '#userGroup',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['Admin', 'User'],
  },
  {
    path: '',
    title: 'Reports & Dashboard',
    icon: '#reports',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: 'democomponent',
        title: 'User Dashboard',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      },
      {
        path: 'democomponent',
        title: 'Reports',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      }
    ],
  },
  {
    path: '',
    title: 'Help',
    icon: '#help',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: 'democomponent',
        title: 'eOffice Help Guide (Doc)',
        icon: '',
        class: '',
        extralink: false,
        submenu: [],
      }
    ],
  },
  {
    path: 'widget',
    title: 'widgets',
    icon: '#userGroup',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['Admin', 'Dev'],
  },

];
