
CREATE TABLE [dbo].[accentcoach_bookings](
	[orderid] [varchar](64) NULL,
	[username] [nvarchar](24) NULL,
	[phone] [varchar](30) NULL,
	[email] [varchar](64) NULL,
	[itemname] [nvarchar](64) NULL,
	[amount] [int] NULL,
	[bookingdate] [datetime] NULL,
	[created_datetime] [datetime] NULL,
	[previous_orderid] [int] NULL,
	[payment_completed_datetime] [datetime] NULL,
	[bookstatus] [int] NULL,
	[paystatus] [varchar](10) NULL,
	[allowtosend] [bit] NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[accentcoach_epaycallback](
	[MerchantID] [varchar](64) NULL,
	[MerchantTradeNo] [varchar](64) NULL,
	[RtnCode] [int] NULL,
	[RtnMsg] [nvarchar](200) NULL,
	[PaymentDate] [datetime] NULL,
	[PaymentType] [varchar](64) NULL,
	[PaymentTypeChargeFee] [int] NULL,
	[TradeAmt] [int] NULL,
	[TradeDate] [datetime] NULL,
	[TradeNo] [varchar](64) NULL,
	[CheckMacValue] [varchar](256) NULL,
	[CalculateCheckMacValue] [varchar](256) NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[accentcoach_recording](
	[username] [nvarchar](64) NULL,
	[email] [nvarchar](128) NULL,
	[audiobuffer] [varbinary](max) NULL,
	[created_datetime] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[accentcoach_timesheet](
	[teacherid] [int] NULL,
	[opendatetime] [datetime] NULL,
	[status] [int] NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[accentcoach_users](
	[userid] [int] NULL,
	[username] [nvarchar](24) NULL,
	[password] [nvarchar](64) NOT NULL,
	[phone] [varchar](30) NULL,
	[email] [varchar](64) NULL,
	[created_datetime] [datetime] NULL,
	[status] [char](1) NULL,
	[email_verified] [char](1) NULL,
	[phone_verified] [char](1) NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[accentcoach_users](
	[userid] [int] NULL,
	[username] [nvarchar](24) NULL,
	[password] [nvarchar](64) NOT NULL,
	[phone] [varchar](30) NULL,
	[email] [varchar](64) NULL,
	[created_datetime] [datetime] NULL,
	[status] [char](1) NULL,
	[email_verified] [char](1) NULL,
	[phone_verified] [char](1) NULL
) ON [PRIMARY]
GO
