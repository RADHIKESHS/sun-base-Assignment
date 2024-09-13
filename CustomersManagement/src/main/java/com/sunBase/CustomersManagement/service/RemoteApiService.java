<<<<<<< HEAD
package com.sunBase.CustomersManagement.service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.sunBase.CustomersManagement.exceptions.ResourceNotFoundException;
import com.sunBase.CustomersManagement.model.Customer;
import com.sunBase.CustomersManagement.repository.CustomerRepository;

@Service
public class RemoteApiService {

    @Value("${remote.api.auth.url}")
    private String authUrl;

    @Value("${remote.api.customers.url}")
    private String customersUrl;

    @Value("${remote.api.auth.credential.login_id}")
    private String loginId;

    @Value("${remote.api.auth.credential.password}")
    private String password;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RestTemplate restTemplate;

    public void syncCustomers() {
        // Step 1: Authenticate and get the access token
        String token = authenticate();

        // Step 2: Fetch the customer list
        List<Customer> customers = fetchCustomers(token);

        // Step 3: Upsert customers
        bulkUpsertCustomers(customers);
    }

    private String authenticate() {
        String authBody = String.format("{\"login_id\": \"%s\", \"password\": \"%s\"}", loginId, password);

        // Call authentication API
        String response = restTemplate.postForObject(authUrl, authBody, String.class);

        // Parse the access token from the response
        return response;  // Extract the token from response as needed
    }

    private List<Customer> fetchCustomers(String token) {
        String url = UriComponentsBuilder.fromHttpUrl(customersUrl)
                                     .queryParam("cmd", "get_customer_list")
                                     .toUriString();

        // Prepare headers
        String extractedToken = new JSONObject(token).getString("access_token");
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(extractedToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        // Call customer API
        ResponseEntity<Customer[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, Customer[].class);

        return Arrays.asList(response.getBody());
    }

    private void bulkUpsertCustomers(List<Customer> customers) {
        // Upsert logic (similar to CustomerService's bulkUpsertCustomers method)
        customers.forEach(customer -> {
            if (customer.getUuid() != null && customerRepository.existsByUuid(customer.getUuid())) {
                // Update existing customer
                Customer existingCustomer = customerRepository.findByUuid(customer.getUuid())
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found with UUID " + customer.getUuid()));
                existingCustomer.setFirst_name(customer.getFirst_name());
                existingCustomer.setLast_name(customer.getLast_name());
                existingCustomer.setStreet(customer.getStreet());
                existingCustomer.setAddress(customer.getAddress());
                existingCustomer.setCity(customer.getCity());
                existingCustomer.setState(customer.getState());
                existingCustomer.setEmail(customer.getEmail());
                existingCustomer.setPhone(customer.getPhone());
                customerRepository.save(existingCustomer);
            } else {
                // Save new customer
                if (customer.getUuid() == null) {
                    customer.setUuid(generateCustomUuid());
                }
                customerRepository.save(customer);
            }
        });
    }
    
    private String generateCustomUuid() {
        // Generate a random UUID and remove hyphens to match the format
        String uuid = UUID.randomUUID().toString().replace("-", "");

        // Ensure the length is exactly 32 characters
        if (uuid.length() != 32) {
            throw new IllegalStateException("Generated UUID is not 32 characters long.");
        }

        // Prefix with "test" to match the required format
        return "test" + uuid;
    }
}

=======
package com.sunBase.CustomersManagement.service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.sunBase.CustomersManagement.exceptions.ResourceNotFoundException;
import com.sunBase.CustomersManagement.model.Customer;
import com.sunBase.CustomersManagement.repository.CustomerRepository;

@Service
public class RemoteApiService {

    @Value("${remote.api.auth.url}")
    private String authUrl;

    @Value("${remote.api.customers.url}")
    private String customersUrl;

    @Value("${remote.api.auth.credential.login_id}")
    private String loginId;

    @Value("${remote.api.auth.credential.password}")
    private String password;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RestTemplate restTemplate;

    public void syncCustomers() {
        // Step 1: Authenticate and get the access token
        String token = authenticate();

        // Step 2: Fetch the customer list
        List<Customer> customers = fetchCustomers(token);

        // Step 3: Upsert customers
        bulkUpsertCustomers(customers);
    }

    private String authenticate() {
        String authBody = String.format("{\"login_id\": \"%s\", \"password\": \"%s\"}", loginId, password);

        // Call authentication API
        String response = restTemplate.postForObject(authUrl, authBody, String.class);

        // Parse the access token from the response
        return response;  // Extract the token from response as needed
    }

    private List<Customer> fetchCustomers(String token) {
        String url = UriComponentsBuilder.fromHttpUrl(customersUrl)
                                     .queryParam("cmd", "get_customer_list")
                                     .toUriString();

        // Prepare headers
        String extractedToken = new JSONObject(token).getString("access_token");
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(extractedToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        // Call customer API
        ResponseEntity<Customer[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, Customer[].class);

        return Arrays.asList(response.getBody());
    }

    private void bulkUpsertCustomers(List<Customer> customers) {
        // Upsert logic (similar to CustomerService's bulkUpsertCustomers method)
        customers.forEach(customer -> {
            if (customer.getUuid() != null && customerRepository.existsByUuid(customer.getUuid())) {
                // Update existing customer
                Customer existingCustomer = customerRepository.findByUuid(customer.getUuid())
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found with UUID " + customer.getUuid()));
                existingCustomer.setFirst_name(customer.getFirst_name());
                existingCustomer.setLast_name(customer.getLast_name());
                existingCustomer.setStreet(customer.getStreet());
                existingCustomer.setAddress(customer.getAddress());
                existingCustomer.setCity(customer.getCity());
                existingCustomer.setState(customer.getState());
                existingCustomer.setEmail(customer.getEmail());
                existingCustomer.setPhone(customer.getPhone());
                customerRepository.save(existingCustomer);
            } else {
                // Save new customer
                if (customer.getUuid() == null) {
                    customer.setUuid(generateCustomUuid());
                }
                customerRepository.save(customer);
            }
        });
    }
    
    private String generateCustomUuid() {
        // Generate a random UUID and remove hyphens to match the format
        String uuid = UUID.randomUUID().toString().replace("-", "");

        // Ensure the length is exactly 32 characters
        if (uuid.length() != 32) {
            throw new IllegalStateException("Generated UUID is not 32 characters long.");
        }

        // Prefix with "test" to match the required format
        return "test" + uuid;
    }
}

>>>>>>> 8532374ded0a8be6e32fcf0c01e928a81baf522d
