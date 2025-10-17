import { db } from '../db';
import { dailyPatientReport } from '../db/schema';

export async function getDailyReport() {
	return await db.select().from(dailyPatientReport).limit(10);
}
