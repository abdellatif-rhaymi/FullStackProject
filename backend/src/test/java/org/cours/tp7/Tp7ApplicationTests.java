package org.cours.tp7;
import static org.assertj.core.api.Assertions.assertThat;
import org.cours.tp7.web.VoitureController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Tp7ApplicationTests {

    @Autowired
    private VoitureController voitureController;

    @Test
    void contextLoads() {
        assertThat(voitureController).isNotNull();
    }
}
