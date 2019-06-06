-- users
SELECT * FROM centralna_banka;
SELECT * FROM banka;
SELECT * FROM korisnik;

-- paying
SELECT * FROM nalog_za_placanje;
SELECT * FROM faktura;
SELECT * FROM stavka_izvoda;
SELECT * FROM transfer_naloga_info;

SELECT * FROM kodovi_banke;
SELECT * FROM racun;

-- UPDATE transfer_naloga_info SET bank_id = 1 where bank_id = 4;


-- helpers
SELECT * FROM gradovi;
SELECT * FROM valuta;
