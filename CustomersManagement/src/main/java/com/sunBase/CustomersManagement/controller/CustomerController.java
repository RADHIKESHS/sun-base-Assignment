<<<<<<< HEAD
package com.sunBase.CustomersManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sunBase.CustomersManagement.model.Customer;
import com.sunBase.CustomersManagement.service.CustomerService;
import com.sunBase.CustomersManagement.service.RemoteApiService;

import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("api")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private RemoteApiService syncService;

    @PostMapping("/add-customer")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @PutMapping("/update-customer/{uuid}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String uuid, @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomer(uuid, customer));
    }

    @GetMapping("/get-customer/{uuid}")
    public ResponseEntity<Customer> getCustomerByUuid(@PathVariable String uuid) {
        return ResponseEntity.ok(customerService.getCustomerByUuid(uuid));
    }

    @GetMapping("/get-all-customers")
    public ResponseEntity<Page<Customer>> listCustomers(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "first_name") String searchBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        // Determine sort order based on the direction
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDirection) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortOrder = Sort.by(direction, searchBy);

        Pageable pageable = PageRequest.of(page, size, sortOrder);
        
        // Fetch customers with search and pagination
        Page<Customer> customers = customerService.listCustomers(search, searchBy, pageable);
        
        return ResponseEntity.ok(customers);
    }


    @DeleteMapping("/delete-customer/{uuid}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String uuid) {
        customerService.deleteCustomer(uuid);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remoteApi-getCustomers/sync")
    public ResponseEntity<Void> syncCustomers() {
    	syncService.syncCustomers();;
        return ResponseEntity.ok().build();
    }
}


=======
package com.sunBase.CustomersManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sunBase.CustomersManagement.model.Customer;
import com.sunBase.CustomersManagement.service.CustomerService;
import com.sunBase.CustomersManagement.service.RemoteApiService;

import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("api")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private RemoteApiService syncService;

    @PostMapping("/add-customer")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @PutMapping("/update-customer/{uuid}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String uuid, @RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.updateCustomer(uuid, customer));
    }

    @GetMapping("/get-customer/{uuid}")
    public ResponseEntity<Customer> getCustomerByUuid(@PathVariable String uuid) {
        return ResponseEntity.ok(customerService.getCustomerByUuid(uuid));
    }

    @GetMapping("/get-all-customers")
    public ResponseEntity<Page<Customer>> listCustomers(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "first_name") String searchBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        // Determine sort order based on the direction
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDirection) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortOrder = Sort.by(direction, searchBy);

        Pageable pageable = PageRequest.of(page, size, sortOrder);
        
        // Fetch customers with search and pagination
        Page<Customer> customers = customerService.listCustomers(search, searchBy, pageable);
        
        return ResponseEntity.ok(customers);
    }


    @DeleteMapping("/delete-customer/{uuid}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String uuid) {
        customerService.deleteCustomer(uuid);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remoteApi-getCustomers/sync")
    public ResponseEntity<Void> syncCustomers() {
    	syncService.syncCustomers();;
        return ResponseEntity.ok().build();
    }
}


>>>>>>> 8532374ded0a8be6e32fcf0c01e928a81baf522d
