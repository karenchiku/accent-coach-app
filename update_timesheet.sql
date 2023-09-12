SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateAccentCoachTimeSheet] 
AS
BEGIN

-- Declare variables
DECLARE @StartDate Datetime = (SELECT cast(convert(date, DATEADD(dd,1, max([opendatetime]))) as datetime) + '10:00:00' 
FROM [dbo].[accentcoach_timesheet])
-- DECLARE @StartDate DATETIME = CAST(CAST(GETDATE() AS DATE) AS DATETIME) + '10:00:00.000';
DECLARE @EndDate DATETIME = DATEADD(DAY, 7, @StartDate);

-- -- Disable the before status
-- UPDATE [dbo].[accentcoach_timesheet]
-- SET [status] = 0
-- WHERE opendatetime < @StartDate 

-- Insert values into the table
WHILE @StartDate < @EndDate
BEGIN
    -- Insert 10:00:00.000 timestamp
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 3, @StartDate),1);
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 4, @StartDate),1);
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 5, @StartDate),1);
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 6, @StartDate),1);
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 7, @StartDate),1);
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 9, @StartDate),1);
    INSERT INTO accentcoach_timesheet (teacherid, opendatetime,[status])
    VALUES (1, DATEADD(HOUR, 10, @StartDate),1);

    -- Move to the next day at 10:00:00.000
    SET @StartDate = DATEADD(DAY, 1,  @StartDate);
END;
END;
GO
