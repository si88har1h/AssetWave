import { Fragment, useState } from "react";
import lessThan from "../../assets/less-than.svg";
import search from "../../assets/Search Glyph.svg";
import Button from "../UI/Button";
import styles from "./SearchModal.module.css";
import Overlay from "../UI/Overlay";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import SearchSuggestion from "../SearchSuggestion/SearchSuggestion";
import { BeatLoader } from "react-spinners";

const SearchModal = (props) => {
  const themeCtx = useContext(ThemeContext);
  const themeClass = themeCtx.theme === "dark" ? styles.dark : "";
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestData, setSuggestData] = useState([]);
  const [emptySuggestion, setEmptySuggestion] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setDuplicateError(false);
    const options = {
      headers: {
        "x-access-token":
          "coinranking68ec3e7515f45e2bb333b1d8ae8ebf80a9c1fb3b14c109b3",
      },
    };
    setEmptySuggestion(false);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coinranking.com/v2/search-suggestions?query=${searchQuery}`,
        options
      );
      const data = await response.json();
      if (!response.ok) throw new Error("Something went wrong");
      if (data.data.coins.length === 0) {
        setEmptySuggestion(true);
      }
      setSuggestData(data.data.coins);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSearchQuery("");
      setLoading(false);
    }
  };

  const searchChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const closeModalHandler = () => {
    props.close(false);
  };
  return (
    <Fragment>
      <div className={`${styles["search-modal"]} ${themeClass}`}>
        <div className={styles["back-btn"]} onClick={closeModalHandler}>
          <img
            src={lessThan}
            alt="less than"
            className={styles["back-image"]}
          />
          <span>Back</span>
        </div>
        <h2 className={styles["search-title"]}>Add Asset</h2>
        <form
          className={styles["search-form"]}
          onSubmit={formSubmitHandler}
          autoComplete="off"
        >
          <img src={search} alt="search icon" className={styles.icon} />
          <input
            type="text"
            name="asset-search"
            className={styles.input}
            placeholder="Search"
            onChange={searchChangeHandler}
            value={searchQuery}
          />
          <Button type="submit" className={styles["search-btn"]}>
            Search
          </Button>
        </form>
        <ul className={styles.search}>
          {!duplicateError &&
            !loading &&
            error === "" &&
            !emptySuggestion &&
            suggestData
              .slice(0, 4)
              .map((dataPoint) => (
                <SearchSuggestion
                  key={dataPoint.uuid}
                  symbol={dataPoint.symbol}
                  name={dataPoint.name}
                  uuid={dataPoint.uuid}
                  close={props.close}
                  duplicate={setDuplicateError}
                />
              ))}
          {!loading && error === "" && emptySuggestion && (
            <p className={styles.error}>No assets found</p>
          )}
          {!loading && error !== "" && (
            <p className={styles.error}>Bad Request :{"("}</p>
          )}
          {loading && (
            <BeatLoader
              color="#767680"
              cssOverride={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          )}
          {!loading && error === "" && duplicateError && (
            <p className={styles.error}>Asset already in portfolio</p>
          )}
        </ul>
      </div>
      <Overlay onClick={props.close} />
    </Fragment>
  );
};

export default SearchModal;
