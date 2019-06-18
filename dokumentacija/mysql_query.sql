-- users
SELECT * FROM centralna_banka;
SELECT * FROM banka;
SELECT * FROM korisnik;

-- paying
SELECT * FROM nalog_za_placanje;
SELECT * FROM naloga_za_prenos_info;
SELECT * FROM paymentorderfiles;
SELECT * FROM faktura;
SELECT * FROM transfer_naloga_info;
SELECT * FROM zahtev_izvoda;

SELECT * FROM kodovi_banke;
SELECT * FROM racun;
SELECT * FROM dnevno_stanje_racuna;

-- UPDATE transfer_naloga_info SET bank_id = 1 where bank_id = 4;
-- UPDATE `poslovna_informatika`.`racun` SET `stanje racuna` = '0' WHERE (`id` = '3');


-- helpers
SELECT * FROM gradovi;
SELECT * FROM valuta;
