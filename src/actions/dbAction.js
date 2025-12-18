"use server";

import ddb from "@/utils/db/mysql";

export async function getTableData(table) {
    const [rows] = await ddb.query(`SELECT * FROM  ${table}`);
    return rows;
}

export async function getMeta(table,route) {
    const [rows] = await ddb.query(
        `SELECT metadata FROM ?? WHERE route = ? LIMIT 1`,
        [table, route]
    );
    return rows[0]?.metadata || null;
}