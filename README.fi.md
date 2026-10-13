# VAK-laskuri

[English](README.md) | Suomi

**VAK-laskuri on vaarallisten aineiden tiekuljetusten määrärajan laskentaan tarkoitettu verkkosovellus.** Kuljettaja voi muodostaa kuormalistan, valita täsmällisen kuljetusnimikkeen ja tarkistaa VAK 2025 -määräyksen kohdan 1.1.3.6 mukaisen laskelman.

**[Avaa VAK-laskuri](https://sovietlabs.github.io/vak-laskuri/)** | **[Englanninkielinen käyttöliittymä](https://sovietlabs.github.io/vak-laskuri/en.html)**

> Testiversio. Tiedot voivat olla virheellisiä tai puutteellisia. Mukana toimitettu aineisto on päivitetty viimeksi **11.10.2026**. Tätä versiota päivitetään käsin. Sovelluksen julkaisupäivä ei ole aineiston päivityspäivä. Tarkista voimassa olevat viralliset määräykset ennen kuljetusta. Tulos ei ole kuljetuslupa.

## Sovelluksen toiminnot

- Haku 2 939 taulukon A nimikkeestä, jotka kattavat 2 347 UN-numeroa.
- Saman UN-numeron eri luokitukset ja pakkausryhmät pidetään erillään.
- Kuorman määrärajan laskenta, sekakuormat ja kategorian 1 alaviitteen poikkeukset.
- Kunkin valitun nimikkeen jäljellä olevan määrän näyttö.
- Mittausperusteen valinta: esimerkiksi nesteen tilavuus, nettomassa, astioiden tilavuus tai räjähdysaineen nettomassa.
- Luokitus, lipukkeet, LQ/EQ-tiedot, pakkaus- ja tunnelikoodit, käsittelymääräykset ja lähdelinkit.
- Enintään kymmenen viimeksi valittua nimikettä selaimen muistissa sekä historian tyhjennys.
- Tulostettava kuormayhteenveto ja tietovirheilmoituksen valmistelu.
- Suomen- ja englanninkielinen käyttöliittymä. Viralliset ainenimet ja määräysotteet ovat suomeksi myös englanninkielisessä versiossa.

## Käyttö

1. Avaa laskuri ja valitse tarvittaessa käyttöliittymän kieli sivun yläreunasta.
2. Hae UN-numerolla tai suomenkielisellä nimellä, esimerkiksi `1203` tai `bensiini`.
3. Valitse lähettäjän tietoja vastaava nimike. Tarkista luokituskoodi ja pakkausryhmä.
4. Syötä määrä ja oikea mittausperuste. Desimaalierotin voi olla pilkku tai piste.
5. Lisää kuljetusyksikön kaikki muut laskentaan kuuluvat aineet. Ajoneuvo ja siihen kytketty perävaunu muodostavat yhden kuljetusyksikön.
6. Tarkista tulos, ainekohtaiset määräykset ja jäljelle jäävät velvoitteet.
7. Tulosta yhteenveto tarvittaessa. Se ei korvaa vaadittuja kuljetusasiakirjoja.

Kuorma on vain välilehden muistissa. Sivun lataaminen uudelleen tai kielen vaihtaminen poistaa kuorman. Viimeksi valitut nimikkeet säilyvät selaimessa historian tai sivustotietojen poistamiseen asti. Historiaan ei tallenneta määriä tai hakusanoja.

![Esimerkkilaskelma: UN 1203](docs/assets/calculator.png)

Kuva esittää määrälaskelmaa. Se ei ole kuljetuslupa. Kuvasta on poistettu valinnainen metatieto.

## Laskennan rajaus

Kuljetuskategoria luetaan taulukon A sarakkeesta 15. Pakkausryhmä yksin ei määrää kerrointa.

| Kategoria | Yhden kategorian enimmäismäärä | Sekakuorman kerroin |
| --- | --- | --- |
| 0 | Vapaarajaa ei voi soveltaa | Estää vapautuksen |
| 1 | 20 | ×50 |
| 1, alaviite a | 50 kg | ×20 |
| 2 | 333 | ×3 |
| 3 | 1 000 | ×1 |
| 4 | Ei määrärajaa tämän kohdan perusteella | ×0 |

Alaviite a koskee UN-numeroita 0081, 0082, 0084, 0241, 0331, 0332, 0482, 1005 ja 1017. Sekakuorman lukuarvo saa olla enintään 1 000. Laskenta käyttää tarkkoja kokonaislukuisia mikroyksiköitä. Raja-arvoa ei aliteta pyöristämällä. Saman kategorian rivit lasketaan yhteen.

Jäljellä olevan määrän tulos edellyttää samaa luokitusta ja mittausperustetta. Se ei vahvista aineiden yhteenkuormauksen sallittavuutta.

### Sovellus ei hyväksy automaattisesti

- Säiliö- tai irtotavarakuljetuksia.
- LQ/EQ-vapautuksia tai erityismääräysten vapautuksia.
- Tyhjiä puhdistamattomia pakkauksia, jäteluokituksia, vahingoittuneita akkuja tai koneita koskevia poikkeuksia.
- Yhteenkuormausta, reittejä, tunneleita, kansallisia erityistapauksia tai turvasuunnitelmia.
- Meri-, lautta-, ilma- tai rautatiekuljetuksia.

Myös määrärajan alapuolella on velvoitteita. Tarkista soveltuvat luokitus-, pakkaus-, merkintä-, lipuke-, sidonta-, asiakirja-, koulutus-, sammutin-, valvonta- ja turvavaatimukset. PDF-otteista voi puuttua taulukoita tai muotoiluja. Tarkista täydellinen teksti alkuperäisestä määräysliitteestä.

## Aineisto ja päivitykset

Sovellus lukee mukana toimitetut [data.json](docs/data.json)- ja [rules.json](docs/rules.json)-tiedostot. Se ei hae tietoja reaaliaikaisesta ainetietokannasta. Tässä repositoriossa ei ole ajastettua päivitystehtävää.

Ylläpitäjän on verrattava virallista lähdettä, tarkistettava luokitusmuutokset ja laskentasäännöt, ajettava testit, päivitettävä aineiston päivämäärä ja julkaistava tarkistettu muutos. Älä muuta aineiston päivämäärää pelkän koodi- tai ohjemuutoksen yhteydessä.

[DATA-SOURCES.md](DATA-SOURCES.md) kuvaa lähteet, version, alkuperän sekä sovelluskoodin lisenssin ja viranomaisaineiston eron.

## Virheen ilmoittaminen

Valitse hakutuloksesta tai kuormariviltä **Ilmoita virhe**.

- **Lataa ilmoitus** tallentaa tekstitiedoston ilman käyttäjätiliä. Mitään ei lähetetä automaattisesti. Toimita tiedosto ylläpitäjälle itse.
- **Avaa ilmoitus GitHubissa** avaa ilmoitusluonnoksen. GitHub-tili tarvitaan. Tarkista teksti ja lähetä ilmoitus GitHubissa. Lähetetty ilmoitus on julkinen.

Voit käyttää myös [GitHub Issues -sivua](https://github.com/sovietlabs/vak-laskuri/issues). Kerro UN-numero, täsmällinen luokitus, aineiston päivämäärä, havaittu virhe, odotettu tieto ja mahdollinen virallinen lähde. Älä lisää nimiä, asiakastietoja, tunnuksia tai yksityisiä kuormatietoja.

Ilmoitus ei muuta aineistoa automaattisesti. Tässä staattisessa versiossa ei ole anonyymia verkkolähetysrajapintaa.

## Paikallinen käyttö

Pakettien asennusta, koontivaihetta, API-avainta tai palvelinsovellusta ei tarvita. Käynnistä staattinen HTTP-palvelin repositorion juuresta:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Avaa `http://127.0.0.1:8080/docs/`. Englanninkielinen versio on `http://127.0.0.1:8080/docs/en.html`. HTML-tiedoston suora avaaminen ei riitä, koska selain lataa JSON-tiedostoja ja moduuleja HTTP-yhteydellä.

Julkaistun projektipolun testaamisesta on lisätietoa tiedostossa [CONTRIBUTING.md](CONTRIBUTING.md).

## Repositorion rakenne

| Polku | Tarkoitus |
| --- | --- |
| `docs/` | GitHub Pagesissa julkaistava staattinen sivusto |
| `docs/index.html`, `docs/en.html` | Suomen- ja englanninkieliset sivut |
| `docs/app.mjs`, `docs/app-en.mjs` | Käyttöliittymät |
| `docs/engine.mjs`, `docs/engine-en.mjs` | Sama laskenta, eri kieliset ilmoitukset |
| `docs/catalogue.mjs` | Aineiston ja määräysotteiden tarkistus |
| `docs/history.mjs` | Rajattu selaimen viimeksi valittujen lista |
| `docs/backend-ui*.mjs` | Päivämäärä ja virheilmoituksen valmistelu ilman palvelinkutsuja |
| `docs/data.json` | Ainenimikkeet ja lähteen tarkistussumma |
| `docs/rules.json` | Määräysotteet ja alkuperäisen PDF:n sivuviitteet |
| `tests/` | Laskennan, aineiston, historian ja sivuston testit |
| `scripts/check-release.py` | Julkaisurajan ja kuvan metatietojen tarkistus |

Selainkoodi on luettavissa `docs/`-hakemistossa. Piilotettua laskentapalvelua ei tarvita.

## Testit ja osallistuminen

Käytä tuettua Node.js-versiota ja Python 3:a:

```sh
node --test tests/*.test.mjs
python3 scripts/check-release.py
```

[CONTRIBUTING.md](CONTRIBUTING.md) kertoo muutosten tarkistuksesta. [SECURITY.md](SECURITY.md) kertoo tietoturvailmoituksista ja rajoista. Päivitä molemmat käyttöliittymäkielet yhdessä. Virallista lähdeaineistoa ei saa korvata tarkistamattomalla käännöksellä.

## GitHub Pages

Julkaisun tarkistuksen jälkeen valitse **Settings → Pages → Deploy from a branch → main → /docs → Save**. Jätä oma verkkotunnus tyhjäksi, jos käytät yllä olevaa GitHub Pages -osoitetta. Julkaisuhaaraan lähetetty muutos voi päivittää sivuston. Tarkista muutokset ennen yhdistämistä.

## Tietosuoja

Sovelluksessa ei ole analytiikkaa, seurantaevästettä, palvelinlaskentaa, automaattista ilmoituslähetystä tai toistuvaa palvelinkyselyä. Viimeksi valittujen lista on selaimen profiilissa ja näkyy saman profiilin käyttäjille. Vain nimikkeiden tunnukset ja aineiston tarkistussumma tallennetaan. Tyhjennä lista yhteiskäyttölaitteella.

GitHub käsittelee tavanomaiset sivustopyynnöt. Lähde- ja ilmoituslinkkien avaaminen muodostaa yhteyden kyseisiin palveluihin. Katso [GitHubin tietosuojaseloste](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Lisenssi ja tila

Alkuperäinen sovelluskoodi on saatavilla [MIT-lisenssillä](LICENSE). Lähdeaineisto ja viranomaistekstit on eroteltu tiedostossa [DATA-SOURCES.md](DATA-SOURCES.md). Sovellus on itsenäinen. Traficom ei ole hyväksynyt tai suosittanut sitä.

Tämä on testityökalu. Kehitystestit eivät osoita lainmukaisuutta eivätkä hyväksy työkalua kuljetuspäätöksiin.
