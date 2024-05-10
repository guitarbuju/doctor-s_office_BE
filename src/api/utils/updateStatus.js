import pool from "../../DB/connection.js";

// Your API endpoint
export const updateInvoiceStatus = async () => {
    try {
        // SQL statement to update invoices status to 'paid' for invoices with net_amount = 0
        const updateStatusQuery = `
        UPDATE invoices AS i
        SET status = 'paid'
        FROM (
            SELECT i.invoice_id
            FROM invoices AS i
            JOIN charges AS c ON i.admission_id = c.admission_id
            WHERE i.status = 'pending'
            AND i.status != 'annulled' -- Add condition to check if status is not 'anulled'
            GROUP BY i.invoice_id,
            c.admission_id
            HAVING SUM(c.total) - COALESCE((SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id), 0) - 
                COALESCE((SELECT SUM(payment) FROM payments WHERE admission_id = c.admission_id), 0) = 0
        ) AS sub
        WHERE i.invoice_id = sub.invoice_id;
        
        `;
        
        // Execute the SQL statement to update invoice status
        await pool.query(updateStatusQuery);

        // Return success message
        return { message: "Invoice statuses updated successfully" };
    } catch (error) {
        // Return error message
        throw new Error(`Error updating invoice statuses: ${error.message}`);
    }
};
