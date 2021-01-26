import com.codeborne.selenide.Configuration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selectors.byText;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.clearBrowserCookies;
import static com.codeborne.selenide.Selenide.clearBrowserLocalStorage;
import static com.codeborne.selenide.Selenide.open;
import static com.codeborne.selenide.Selenide.refresh;
import static com.codeborne.selenide.Selenide.sleep;
import static com.codeborne.selenide.WebDriverRunner.hasWebDriverStarted;
import static com.codeborne.selenide.WebDriverRunner.url;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class SelenideTests{
    private final String url = "http://localhost:3000/";

    @BeforeEach
    public void setUp() {
        Configuration.fastSetValue = false;
        if (hasWebDriverStarted()) {
            clearBrowserCookies();
            clearBrowserLocalStorage();
            refresh();
        }
        else {
            open(url);
        }
    }

    @Test
    public void hasHeader() {
        $("h1").should(exist);
        $("h1").shouldHave(text("Sign in"));
    }

    @Test
    public void SignUpLink() {
        $(By.linkText("Don\'t have an account? Sign Up")).should(exist);
        $(By.linkText("Don\'t have an account? Sign Up")).click();
        assertEquals( url+"signup", url());
    }

    @Test
    public void AvatarNotExists() {
        $(By.id("avatar")).shouldNot(exist);
    }

    @Test
    public void FailedLogin(){
        open(url);
        $(By.id("login")).should(exist);
        $(By.id("login")).setValue("Login");
        $(By.id("password")).should(exist);
        $(By.id("password")).setValue("Pass");
        $(By.id("submit")).should(exist);
        $(By.id("login-helper-text")).shouldNot(exist);
        $(By.id("submit")).click();
        $(By.id("login-helper-text")).should(exist);
    }
}
