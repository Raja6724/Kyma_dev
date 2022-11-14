const cds = require('@sap/cds');

const { Employees } = cds.entities('my.Company');

module.exports = async (srv) => {

    srv.on("READ", "Employees", async (req, next) => {

        console.log(req.data);

        const tx = cds.transaction(req);

        const result = await tx.run(
            SELECT.from(Employees)
        )

        return result;
    })

    srv.on('functionCall', async (req, res) => {

        return { "any": "ert" };

    })

    srv.on('actionCall', async (req, res) => {

        try {

            const tx = cds.transaction(req);

            console.log(req.data.param);

            const result = await tx.run(

                INSERT.into(Employees).entries(req.data.param[0])

            );
            console.log(result);
            return 'Success';

        }
        catch (error) {

            return error.message;

        }
    })


}