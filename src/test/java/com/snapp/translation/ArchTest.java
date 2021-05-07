package com.snapp.translation;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.snapp.translation");

        noClasses()
            .that()
            .resideInAnyPackage("com.snapp.translation.service..")
            .or()
            .resideInAnyPackage("com.snapp.translation.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.snapp.translation.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
