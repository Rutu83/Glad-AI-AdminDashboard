import {
  MdDashboard,
  MdGroup,
  MdReceipt,
  MdPayments,
  MdPsychology,
  MdNotifications,
  MdSettings,
  MdSmartToy,
  MdLogout,
  MdSearch,
  MdExpandMore,
  MdPersonAdd,
  MdMoreVert,
  MdChevronRight,
  MdChevronLeft,
  MdCalendarToday,
  MdTrendingUp,
  MdTrendingDown,
  MdAttachMoney,
  MdDns,
  MdConfirmationNumber,
  MdGraphicEq,
  MdTouchApp,
  MdCheckCircle,
  MdBolt,
  MdWarning,
  MdLogin,
  MdCreditCard,
  MdQrCode2,
  MdAccountBalance,
  MdTerminal,
  MdAutorenew,
  MdPersonRemove,
  MdMoreHoriz,
  MdDownload,
  MdDiamond,
  MdApartment,
  MdHelp,
  MdHistory,
  MdEditSquare,
  MdAddPhotoAlternate,
  MdInfo,
  MdSend,
  MdRocket,
  MdCelebration,
  MdSchedule,
  MdCampaign,
  MdFlashlightOn,
  MdPhotoCamera,
  MdSignalCellularAlt,
  MdWifi,
  MdBatteryFull,
  MdApi,
  MdKey,
  MdCloudQueue,
  MdTune,
  MdSecurity,
  MdVisibilityOff,
  MdVisibility,
  MdMenu,
  MdClose,
  MdRemove,
  MdCalendarMonth,
  MdMail,
  MdLock,
  MdError,
  MdPerson
} from 'react-icons/md'

interface IconProps {
  name: string
  className?: string
  size?: number
}

const iconMap: Record<string, React.ComponentType<any>> = {
  // Navigation
  'dashboard': MdDashboard,
  'group': MdGroup,
  'receipt_long': MdReceipt,
  'payments': MdPayments,
  'psychology': MdPsychology,
  'notifications': MdNotifications,
  'settings': MdSettings,
  'smart_toy': MdSmartToy,
  'logout': MdLogout,
  'menu': MdMenu,
  'close': MdClose,

  // Actions
  'search': MdSearch,
  'expand_more': MdExpandMore,
  'person_add': MdPersonAdd,
  'more_vert': MdMoreVert,
  'chevron_right': MdChevronRight,
  'chevron_left': MdChevronLeft,
  'calendar_today': MdCalendarToday,
  'calendar_month': MdCalendarMonth,
  'download': MdDownload,
  'send': MdSend,
  'edit_square': MdEditSquare,
  'add_photo_alternate': MdAddPhotoAlternate,
  'info': MdInfo,

  // Status & Trends
  'trending_up': MdTrendingUp,
  'trending_down': MdTrendingDown,
  'check_circle': MdCheckCircle,
  'warning': MdWarning,
  'bolt': MdBolt,
  'remove': MdRemove,

  // Finance & Business
  'attach_money': MdAttachMoney,
  'credit_card': MdCreditCard,
  'qr_code_2': MdQrCode2,
  'account_balance': MdAccountBalance,
  'autorenew': MdAutorenew,
  'person_remove': MdPersonRemove,
  'diamond': MdDiamond,
  'apartment': MdApartment,

  // Technology
  'dns': MdDns,
  'graphic_eq': MdGraphicEq,
  'touch_app': MdTouchApp,
  'terminal': MdTerminal,
  'api': MdApi,
  'key': MdKey,
  'cloud_queue': MdCloudQueue,
  'tune': MdTune,
  'security': MdSecurity,
  'visibility_off': MdVisibilityOff,

  // Communication
  'confirmation_number': MdConfirmationNumber,
  'login': MdLogin,
  'campaign': MdCampaign,
  'rocket': MdRocket,
  'celebration': MdCelebration,
  'schedule': MdSchedule,

  // Utilities
  'more_horiz': MdMoreHoriz,
  'help': MdHelp,
  'history': MdHistory,
  'flashlight_on': MdFlashlightOn,
  'photo_camera': MdPhotoCamera,
  'signal_cellular_alt': MdSignalCellularAlt,
  'wifi': MdWifi,
  'battery_full': MdBatteryFull,

  // Login page icons
  'visibility': MdVisibility,
  'mail': MdMail,
  'lock': MdLock,
  'error': MdError,
  'person': MdPerson,
}

export default function Icon({ name, className = '', size }: IconProps) {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`)
    return <span className={`inline-block ${className}`} style={{ width: size, height: size }}>?</span>
  }

  return <IconComponent className={className} size={size} />
}