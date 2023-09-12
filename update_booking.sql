SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateAccentCoachBooking] 
    @OrderID VARCHAR(64), @PaymentDate DATETIME, @RtnCode VARCHAR(10)
AS
BEGIN
   UPDATE dbo.accentcoach_bookings
   SET paystatus = @RtnCode , payment_completed_datetime = @PaymentDate
        WHERE orderid = @OrderID

    UPDATE t 
    SET t.status = 0
    FROM dbo.accentcoach_timesheet t
    LEFT JOIN dbo.accentcoach_bookings b ON t.opendatetime = b.bookingdate
        WHERE b.orderid = @OrderID;
END;

GO
